package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.controller.EmailController;
import com.dh.digital_booking.entity.ProdutoEntity;
import com.dh.digital_booking.entity.ReservaEntity;
import com.dh.digital_booking.entity.UserEntity;
import com.dh.digital_booking.entity.dto.EmailDto;
import com.dh.digital_booking.repository.IProdutoRepository;
import com.dh.digital_booking.repository.IReservaRepository;
import com.dh.digital_booking.repository.IUserRepository;
import com.dh.digital_booking.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ReservaService implements IHotelService<ReservaEntity> {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    @Autowired
    private IReservaRepository reservaRepository;

    @Autowired
    private EmailController emailController;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IProdutoRepository produtoRepository;

    @Override
    public List<ReservaEntity> findAll() {
        return reservaRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<ReservaEntity>> findById(Long id) {
        Optional<ReservaEntity> reserva;
        reserva = reservaRepository.findById(id);
        if (reserva.isPresent()){
            return new ResponseEntity<>(reserva, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ReservaEntity adicionar(ReservaEntity reservaEntity) throws Exception {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(idUser).get();

        Long productId = reservaEntity.getProduto().getId();
        ProdutoEntity produto = produtoRepository.findById(productId).get();

        reservaEntity.setUser(userEntity);
        reservaEntity.setProduto(produto);
        reservaEntity.setCreated_at(LocalDateTime.now());
        if (reservaEntity.getData_inicio_reserva().isBefore(reservaEntity.getData_fim_reserva())) {
            EmailDto emailDto = new EmailDto();
            emailDto.setOwnerRef(userEntity.getFirstname());
            emailDto.setEmailFrom("pi@apolloit.com.br");
            emailDto.setEmailTo(userEntity.getEmail());
            emailDto.setSubject("Reserva Digital Booking");
            emailDto.setText(contentEmail(produto.getNome(),reservaEntity.getData_inicio_reserva(),reservaEntity.getData_fim_reserva()));
            emailController.sendingEmail(emailDto);
            return reservaRepository.save(reservaEntity);
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Sua entrada não pode ser depois/igual da sua saída e sua saída não pode ser antes/igual da sua entrada");
        }
    }

    @Override
    public ResponseEntity<String> deletar(Long id) {
        if(reservaRepository.findById(id).isPresent()){
            ReservaEntity existingReserva = reservaRepository.findById(id).get(); // Pega a reserva com base no ID passado por parametro.

            Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
            String idUser = (String) principal;
            UserEntity userEntity = userRepository.findByEmail(idUser).get(); // Pega o usuário da sessão atual.
            if(Objects.equals(existingReserva.getUser().getId(), userEntity.getId()) || Objects.equals(userEntity.getFuncoes().getNome(), "ADMIN")) {
                reservaRepository.deleteById(id);
                return ResponseEntity.ok().body("Reserva apagada!");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reserva não encontrada!");
    }

    @Override
    public ReservaEntity atualizar(Long id, ReservaEntity reservaEntity) throws Exception {
        if(reservaEntity != null && reservaRepository.findById(id).isPresent()) {
            ReservaEntity existingReserva = reservaRepository.findById(id).get(); // Pega a reserva com base no ID passado por parametro.

            Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
            String idUser = (String) principal;
            UserEntity userEntity = userRepository.findByEmail(idUser).get(); // Pega o usuário da sessão atual.
            if(Objects.equals(existingReserva.getUser().getId(), userEntity.getId())) {
                existingReserva.setUser(userEntity);
                Long productId = existingReserva.getProduto().getId();
                ProdutoEntity produto = produtoRepository.findById(productId).get();
                existingReserva.setProduto(produto);
            }
            if (existingReserva.getData_inicio_reserva().isBefore(reservaEntity.getData_fim_reserva()) && existingReserva.getData_fim_reserva().isAfter(reservaEntity.getData_inicio_reserva())) {
                existingReserva.setData_inicio_reserva(reservaEntity.getData_inicio_reserva());
                existingReserva.setData_fim_reserva(reservaEntity.getData_fim_reserva());
            } else {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Sua entrada não pode ser depois/igual da sua saída e sua saída não pode ser antes/igual da sua entrada");
            }
            return reservaRepository.save(existingReserva);
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Você não pode atualizar uma reserva que não é sua!");
            }
    }

    public List<ProdutoEntity> consultaReservaPorData(LocalDate dataInicio, LocalDate dataFim) {
        return reservaRepository.consultaReservaPorData(dataInicio, dataFim);
    }

    public List<ProdutoEntity> consultaReservaPorDataCidade(String cidade, LocalDate dataInicio, LocalDate dataFim) {
        return reservaRepository.consultaReservaPorDataCidade("%" + cidade + "%", dataInicio, dataFim);
    }

    public List<?> ReservaProdutoUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(idUser).get();
        Set<ReservaEntity> reservas = userEntity.getReservas(); // Salvando os ID's das reservas em uma lista
        List<ReservaEntity> reservaEntities = new ArrayList<>();
        for (ReservaEntity reserva : reservas) {
            if (reserva.getUser().getId() == userEntity.getId()) {
                ReservaEntity reservaEntity = new ReservaEntity(
                reserva.getId(),
                reserva.getHora_inicio(),
                reserva.getData_inicio_reserva(),
                reserva.getData_fim_reserva(),
                reserva.getCreated_at(),
                reserva.getProduto(),
                reserva.getUser());

                reservaEntities.add(reservaEntity);
            }
        }
        return reservaEntities;
    }

    public String contentEmail(String nomeDoHotel, LocalDate checkIn, LocalDate checkOut) {
        return  "<p><img src=\"data:image/png;base64,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\" alt=\"teste\" width=\"230\" height=\"52\" style=\"display: block; margin-left: auto; margin-right: auto;\" /></p> \n" +
                "<p></p> \n" +
                "<p style=\"text-align: center;\"><strong>Sua Reserva foi realizada com sucesso!</strong></p> \n" +
                "<p><img src=\"https://i.giphy.com/media/SsaWuR3owjU7a0G8z1/giphy-downsized.gif\" alt=\"gif\" width=\"270\" height=\"152\" style=\"display: block; margin-left: auto; margin-right: auto;\" /></p> \n" +
                "<p style=\"text-align: center;\"><strong>Confira abaixo os dados da sua reserva:</strong></p> \n" +
                "<p style=\"text-align: center;\">Hotel: " + nomeDoHotel + " </p> \n" +
                "<p style=\"text-align: center;\">Check-In: "  + checkIn.format(formatter) + " </p> \n" +
                "<p style=\"text-align: center;\">Check-out: "+ checkOut.format(formatter) + " </p> \n" +
                "<p style=\"padding-left: 40px;\"></p> \n" +
                "<p style=\"text-align: center;\"><strong>Estamos te aguardando!</strong></p> \n" +
                "<p style=\"padding-left: 40px;\"><strong></strong></p> \n" +
                "<p style=\"text-align: center;\">Qualquer d&uacute;vida estamos a disposi&ccedil;&atilde;o.</p> \n" +
                "<p style=\"text-align: center;\">Equipe DH Booking</p> \n" ;
    }
}
