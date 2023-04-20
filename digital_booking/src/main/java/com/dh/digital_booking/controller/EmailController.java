package com.dh.digital_booking.controller;

import com.dh.digital_booking.entity.EmailEntity;
import com.dh.digital_booking.entity.dto.EmailDto;
import com.dh.digital_booking.service.impl.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmailController {

    @Autowired
    EmailService emailService;

    @PostMapping("/sending-email")
    public ResponseEntity<EmailEntity> sendingEmail(@RequestBody @Valid EmailDto emailDto) {
        EmailEntity emailModel = new EmailEntity();
        BeanUtils.copyProperties(emailDto, emailModel);
        emailService.sendEmail(emailModel);
        return new ResponseEntity<>(emailModel, HttpStatus.CREATED);
    }
}
