package com.dh.digital_booking.controller;

import com.dh.digital_booking.auth.AuthenticationRequest;
import com.dh.digital_booking.auth.AuthenticationResponse;
import com.dh.digital_booking.auth.RegisterRequest;
import com.dh.digital_booking.entity.CidadeEntity;
import com.dh.digital_booking.entity.UserEntity;
import com.dh.digital_booking.service.impl.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*") // Liberando o controlador dos CORS
@RequestMapping("/authentication")
@Tag(description = "Registro e Login na aplicação", name = "Autenticação")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private AuthenticationService service;

    @Operation(summary = "Criar conta na aplicação")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = RegisterRequest.class))
    })
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) throws Exception {
        return new ResponseEntity<>(service.register(request), HttpStatus.CREATED);
    }

    @Operation(summary = "Entrar no sistema")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = AuthenticationRequest.class))
    })
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authentication(@RequestBody AuthenticationRequest request) throws Exception {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @Operation(summary = "Validar informações do usuário autenticado")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserEntity.class))
    })
    @GetMapping("/validate")
    public ResponseEntity<ResponseEntity<UserEntity>> tokenValidate() {
        return ResponseEntity.ok(service.tokenValidate());
    }
}