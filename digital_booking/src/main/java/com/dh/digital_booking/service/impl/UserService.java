package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.entity.ProdutoEntity;
import com.dh.digital_booking.entity.UserEntity;
import com.dh.digital_booking.repository.IUserRepository;
import com.dh.digital_booking.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements IUserService<UserEntity> {
    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<UserEntity> findAll() {
        return userRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<UserEntity>> findById(Integer id) {
        Optional<UserEntity> user;
        user = userRepository.findById(id);
        if (user.isPresent()){
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<String> deletar(Integer id) {
        if(userRepository.findById(id).isPresent()){
            userRepository.deleteById(id);
            return ResponseEntity.ok().body("Usuário apagado!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrada!");
    }

    @Override
    public ResponseEntity<String> atualizar(UserEntity user){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(idUser).get();

        if(user != null && userRepository.findById(userEntity.getId()).isPresent()) { // ID do usuário logado presente

            if (userRepository.findByEmail(user.getEmail()).isEmpty() || userEntity.getEmail() == user.getEmail() ||
                userRepository.findByEmail(user.getEmail()).get().getId() == user.getId()) {
                user.setPassword(userEntity.getPassword());
                userRepository.saveAndFlush(user);
                return ResponseEntity.ok().body("Usuário atualizado!");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já existente");
            }


        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível localizar esse usuário");
    }

    public Set<ProdutoEntity> produtosCriadosPeloUsuario() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(idUser).get();

        Set<ProdutoEntity> produtos = userEntity.getProdutos(); // Pegando os produtos que foram criados

        return produtos;


    }

}