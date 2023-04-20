package com.dh.digital_booking.controller;


import com.dh.digital_booking.entity.ClassificacaoEntity;
import com.dh.digital_booking.entity.ProdutoEntity;

import com.dh.digital_booking.entity.ReservaEntity;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.ReservaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*") // Liberando o controlador dos CORS
@RequestMapping(value = "/reserva")
@Tag(description = "Reservas do Produto", name = "Reserva")
public class ReservaController {

    final static Logger log = Logger.getLogger(String.valueOf(ReservaController.class));

    @Autowired
    private ReservaService reservaService;
    @Operation(summary = "Buscar todos as reservas")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ReservaEntity.class))
    })
    @GetMapping
    public ResponseEntity<List<ReservaEntity>> buscarTodasReservas() throws ResourceNotFoundException {

        try {
            log.info("Realizando a busca de todas as reservas");
            List<ReservaEntity> list = reservaService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todas as reservas " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar as reservas");

        }
    }
    @Operation(summary = "Consultar reservar por data")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ReservaEntity.class))
    })
    @GetMapping("/consultaReservaData")
    public ResponseEntity<List<ProdutoEntity>> consultaReservaPorData(@RequestParam @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataInicio, @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataFim) throws ResourceNotFoundException {
        try {
            log.info("Realizando a busca dos produtos por data");
            List<ProdutoEntity> list = reservaService.consultaReservaPorData(dataInicio, dataFim);
            if (list.size() == 0) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca dos produtos " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar os produtos");
        }
    }
    @Operation(summary = "Consultar reservar por data e cidade")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ReservaEntity.class))
    })
    @GetMapping("/consultaReservaDataCidade")
    public ResponseEntity<List<ProdutoEntity>> consultaReservaPorDataCidade(@RequestParam String cidade, @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataInicio, @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataFim) throws ResourceNotFoundException {
        try {
            log.info("Realizando a busca dos produtos por data e cidade");
            List<ProdutoEntity> list = reservaService.consultaReservaPorDataCidade(cidade, dataInicio, dataFim);
            if (list.size() == 0) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca dos produtos " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar os produtos");
        }
    }
    @Operation(summary = "Buscar reserva pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ReservaEntity.class))
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<ReservaEntity>> buscarReservaPorId(@PathVariable Long id) throws ResourceNotFoundException{

        try {
            log.info("Buscando a reserva pelo ID: " + id);
            return reservaService.findById(id);

        } catch (Exception e) {
            log.error("Não foi possível realizar a busca da reserva de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar a reserva");
        }
    }
    @Operation(summary = "Criar reserva para um Produto")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ReservaEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping
    public ResponseEntity<ReservaEntity> adicionarReserva(@RequestBody ReservaEntity reserva){
        try {
            log.info("Realizando a adição de uma nova reserva");
            return new ResponseEntity<>(reservaService.adicionar(reserva), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Erro ao realizar adição da reserva " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Sua entrada não pode ser depois/igual da sua saída e sua saída não pode ser antes/igual da sua entrada");
        }
    }
    @Operation(summary = "Deletar reserva")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ReservaEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteReserva(@PathVariable Long id) throws ResourceNotFoundException {

        try {
            log.info("Excluindo reserva de ID: " + id);
            return reservaService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão da reserva de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar a reserva de ID: " + id + " - " + e.getMessage());
        }
    }
    @Operation(summary = "Atualizar reserva")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ReservaEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping(value = "/atualizar/{id}")
    public ReservaEntity atualizarReserva(@PathVariable Long id, @RequestBody ReservaEntity reserva){
        try {
            log.info("Atualizando a reserva.");
            return reservaService.atualizar(id, reserva);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o reserva.");
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Sua entrada não pode ser depois/igual da sua saída e sua saída não pode ser antes/igual da sua entrada");
        }
    }
    @Operation(summary = "Buscar as reservas do usuário logado")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ReservaEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/reservaUser")
    public List<?> ReservaProdutoUser(){
        return reservaService.ReservaProdutoUser();
    }

}
