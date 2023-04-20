package com.dh.digital_booking.controller;

import com.dh.digital_booking.entity.CaracteristicaEntity;
import com.dh.digital_booking.entity.UserEntity;
import com.dh.digital_booking.exceptions.BadRequestException;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.CaracteristicaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*") // Liberando o controlador dos CORS
@RequestMapping (value = "/caracteristica")
@Tag(description = "Características que serão utilizadas nos produtos", name = "Características")
public class CaracteristicaController {
    final static Logger log = Logger.getLogger(String.valueOf(CaracteristicaController.class));

    @Autowired
    private CaracteristicaService caracteristicaService;

    @Operation(summary = "Buscar todos as características")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CaracteristicaEntity.class))
    })
    @GetMapping
    public ResponseEntity<List<CaracteristicaEntity>> buscarTodasCaracteristicas() throws ResourceNotFoundException {
        try {
            log.info("Realizando a busca de todas as caracteristicas");
            List<CaracteristicaEntity> list = caracteristicaService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todas as caracteristicas " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar as caracteristicas");
        }
    }

    @Operation(summary = "Buscar característica pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CaracteristicaEntity.class))
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<CaracteristicaEntity>> buscarCaracteristicaPorId(@PathVariable Long id) throws ResourceNotFoundException{
        try {
            log.info("Buscando a caracteristica pelo ID: " + id);
            return caracteristicaService.findById(id);
        } catch (Exception e) {
            log.error("Não foi possível realizar a busca da caracteristica de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar a caracteristica");
        }
    }

    @Operation(summary = "Criar característica")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CaracteristicaEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping
    public ResponseEntity<CaracteristicaEntity> adicionarCaracteristica(@RequestBody CaracteristicaEntity caracteristicaEntity) throws BadRequestException {
        try {
            log.info("Realizando a adição de uma nova caracteristica");
            return new ResponseEntity<>(caracteristicaService.adicionar(caracteristicaEntity), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Erro ao realizar adição da caracteristica " + e.getMessage());
            throw new BadRequestException("Não foi possível salvar a caracteristica informada");
        }
    }

    @Operation(summary = "Deletar característica pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CaracteristicaEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteCaracteristica(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            log.info("Excluindo caracteristica de ID: " + id);
            return caracteristicaService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão da caracteristica de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar a caracteristica de ID: " + id + " - " + e.getMessage());
        }
    }

    @Operation(summary = "Atualizar característica")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CaracteristicaEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping(value = "/atualizar/{id}")
    public CaracteristicaEntity atualizarCaracteristica(@PathVariable Long id ,@RequestBody CaracteristicaEntity caracteristicaEntity) throws ResourceNotFoundException {
        try {
            log.info("Atualizando a caracteristica.");
            return caracteristicaService.atualizar(id,caracteristicaEntity);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o caracteristica.");
            throw new ResourceNotFoundException("Caracteristica não foi encontrada para ser atualizado. " + e.getMessage());
        }
    }
}