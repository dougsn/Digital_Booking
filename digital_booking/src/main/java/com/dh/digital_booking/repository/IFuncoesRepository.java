package com.dh.digital_booking.repository;

import com.dh.digital_booking.entity.FuncaoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFuncoesRepository extends JpaRepository<FuncaoEntity, Long> {

    FuncaoEntity findByNome(String nome);
}
