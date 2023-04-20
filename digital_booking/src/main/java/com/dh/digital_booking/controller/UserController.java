package com.dh.digital_booking.controller;
import com.dh.digital_booking.entity.CidadeEntity;
import com.dh.digital_booking.entity.ProdutoEntity;
import com.dh.digital_booking.entity.UserEntity;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*") // Liberando o controlador dos CORS
@RequestMapping(value = "/user")
@Tag(description = "Usuários da aplicação", name = "Usuário")
public class UserController {
    final static Logger log = Logger.getLogger(String.valueOf(UserController.class));

    @Autowired
    private UserService userService;
    @Operation(summary = "Buscar todos os usuários")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserEntity.class))
    })
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<List<UserEntity>> buscarTodosUsuarios() throws ResourceNotFoundException {
        try {
            log.info("Realizando a busca de todos os usuários");
            List<UserEntity> list = userService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todos os usuários " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar os usuários");
        }
    }

    @Operation(summary = "Buscar usuário pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<UserEntity>> buscarUsuarioPorId(@PathVariable Integer id) throws ResourceNotFoundException{
        try {
            log.info("Buscando o usuário pelo ID: " + id);
            return userService.findById(id);
        } catch (Exception e) {
            log.error("Não foi possível realizar a busca do usuário de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar o usuário");
        }
    }

    @Operation(summary = "Deletar usuário pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserEntity.class))
    })
    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<String> deleteUsuario(@PathVariable Integer id) throws ResourceNotFoundException {
        try {
            log.info("Excluindo usuário de ID: " + id);
            return userService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão do usuário de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar o usuário de ID: " + id + " - " + e.getMessage());
        }
    }

    @Operation(summary = "Atualizar usuário")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserEntity.class))
    })
    @PutMapping(value = "/atualizar")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<String> atualizarUsuario(@RequestBody UserEntity userEntity) throws ResourceNotFoundException {
        try {
            log.info("Atualizando o usuário.");
            return userService.atualizar(userEntity);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o usuário.");
            throw new ResourceNotFoundException("usuário não foi encontrado para ser atualizado. " + e.getMessage());
        }
    }
    @Operation(summary = "Buscar produto criado pelo usuário")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserEntity.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping(value = "/produtosCriados")
    public Set<ProdutoEntity> produtosCriadosPeloUsuario() {
        return userService.produtosCriadosPeloUsuario();
    }
}