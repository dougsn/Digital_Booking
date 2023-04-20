package com.dh.digital_booking.repository;

import com.dh.digital_booking.entity.EmailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEmailRepository extends JpaRepository<EmailEntity, Long> {
}
