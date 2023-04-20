package com.dh.digital_booking.service;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface IUserService<T> {
    List<T> findAll();

    ResponseEntity<Optional<T>> findById(Integer id);

    ResponseEntity<String> deletar(Integer id);

    ResponseEntity<String> atualizar(T t);

}