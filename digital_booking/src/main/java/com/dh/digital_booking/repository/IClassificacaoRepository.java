package com.dh.digital_booking.repository;

import com.dh.digital_booking.entity.ClassificacaoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IClassificacaoRepository extends JpaRepository<ClassificacaoEntity, Long> {
}
