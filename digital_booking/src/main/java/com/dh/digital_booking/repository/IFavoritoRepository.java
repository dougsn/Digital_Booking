package com.dh.digital_booking.repository;

import com.dh.digital_booking.entity.FavoritoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFavoritoRepository extends JpaRepository<FavoritoEntity, Long> {
}
