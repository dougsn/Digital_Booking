package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.entity.EmailEntity;
import com.dh.digital_booking.entity.enums.StatusEmail;
import com.dh.digital_booking.repository.IEmailRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.data.domain.Page;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

@Service
public class EmailService {

    @Autowired
    IEmailRepository emailRepository;

    @Autowired
    private JavaMailSender emailSender;

    @Transactional
    public EmailEntity sendEmail(EmailEntity emailModel) {
        emailModel.setSendDateEmail(LocalDateTime.now());
        try {
            MimeMessage mail = emailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mail);

            message.setText(emailModel.getText(), true);
            message.setFrom(emailModel.getEmailFrom());
            message.setTo(emailModel.getEmailTo());
            message.setSubject(emailModel.getSubject());

            emailSender.send(mail);
            emailModel.setStatusEmail(StatusEmail.SENT);
        } catch (MailException e) {
            emailModel.setStatusEmail(StatusEmail.ERROR);
        } finally {
            return emailRepository.save(emailModel);
        }
    }
    public Page<EmailEntity> findAll(Pageable pageable) {
        return emailRepository.findAll(pageable);
    }
}