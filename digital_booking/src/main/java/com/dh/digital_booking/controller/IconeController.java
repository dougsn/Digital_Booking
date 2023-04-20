package com.dh.digital_booking.controller;

import com.dh.digital_booking.entity.CidadeEntity;
import com.dh.digital_booking.entity.IconeEntity;
import com.dh.digital_booking.exceptions.BadRequestException;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.IconeService;
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

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/icone")
@Tag(description = "Icones que serão utilizadas nas caracteristicas", name = "Icone")
public class IconeController {

    final static Logger log = Logger.getLogger(String.valueOf(IconeController.class));

    @Autowired
    private IconeService iconeService;

    @Operation(summary = "Buscar todos os icones")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = IconeEntity.class))
    })
    @GetMapping
    public ResponseEntity<List<IconeEntity>> buscarTodosIcones() throws ResourceNotFoundException {

        try {
            log.info("Realizando a busca de todos os icones");
            List<IconeEntity> list = iconeService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todos os icones " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar os icones");

        }
    }

    @Operation(summary = "Buscar icone pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = IconeEntity.class))
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<IconeEntity>> buscarIconePorId(@PathVariable Long id) throws ResourceNotFoundException{

        try {
            log.info("Buscando o icone pelo ID: " + id);
            return iconeService.findById(id);

        } catch (Exception e) {
            log.error("Não foi possível realizar a busca do icone de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar o icone");
        }
    }

    @Operation(summary = "Criar um icone")
    @ApiResponse(responseCode = "201", description = "Criado", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = IconeEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping
    public ResponseEntity<IconeEntity> adicionarIcone(@RequestBody IconeEntity iconeEntity) throws BadRequestException {
        try {
            log.info("Realizando a adição de uma novo icone");
            return ResponseEntity.ok(iconeService.adicionar(iconeEntity));
        } catch (Exception e) {
            log.error("Erro ao realizar adição do icone " + e.getMessage());
            throw new BadRequestException("Não foi possível salvar o icone informado");
        }
    }

    @Operation(summary = "Deletar icone pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = IconeEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteIcone(@PathVariable Long id) throws ResourceNotFoundException {

        try {
            log.info("Excluindo icone de ID: " + id);
            return iconeService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão do icone de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar o icone de ID: " + id + " - " + e.getMessage());
        }
    }

    @Operation(summary = "Atualizar o icone")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = IconeEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping(value = "/atualizar/{id}")
    public IconeEntity atualizarIcone(@PathVariable Long id ,@RequestBody IconeEntity iconeEntity) throws ResourceNotFoundException {
        try {
            log.info("Atualizando o icone.");
            return iconeService.atualizar(id,iconeEntity);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o icone.");
            throw new ResourceNotFoundException("Icone não foi encontrado para ser atualizado. " + e.getMessage());
        }
    }



}
