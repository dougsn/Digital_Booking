package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.auth.AuthenticationRequest;
import com.dh.digital_booking.auth.AuthenticationResponse;
import com.dh.digital_booking.auth.RegisterRequest;
import com.dh.digital_booking.config.JwtService;
import com.dh.digital_booking.entity.FuncaoEntity;
import com.dh.digital_booking.repository.IFuncoesRepository;
import com.dh.digital_booking.repository.IUserRepository;
import com.dh.digital_booking.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final IUserRepository repository;
    @Autowired
    private IFuncoesRepository funcoesRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Autowired
    private IUserRepository userRepository;

    public AuthenticationResponse register(RegisterRequest request) throws Exception {
        var email = request.getEmail();
        if(repository.findByEmail(email).isPresent()) throw new Exception("E-mail já cadastrado");
        FuncaoEntity func;
        if (funcoesRepository.findByNome("USER") == null) {
            func = new FuncaoEntity(null, "USER");
            funcoesRepository.save(func);
        } else {
            func = funcoesRepository.findByNome("USER");
        }
        var user = UserEntity.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .funcoes(func)
                .build();

        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public ResponseEntity<UserEntity> tokenValidate(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(idUser).get();
        return ResponseEntity.ok().body(userEntity);
    }
}