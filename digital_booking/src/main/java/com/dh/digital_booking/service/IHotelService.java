package com.dh.digital_booking.service;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface IHotelService<T> {
    List<T> findAll();
    ResponseEntity<Optional<T>> findById(Long id);
    T adicionar(T t) throws Exception;
    ResponseEntity<String> deletar(Long id);
    T atualizar(Long id, T t) throws Exception;
}
