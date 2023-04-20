package com.dh.digital_booking.repository;

import com.dh.digital_booking.entity.CategoriaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoriaRepository extends JpaRepository<CategoriaEntity, Long> {
}
