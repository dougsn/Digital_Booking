package com.dh.digital_booking.repository;

import com.dh.digital_booking.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<UserEntity, Integer>  {

    Optional<UserEntity> findByEmail(String email);

}
