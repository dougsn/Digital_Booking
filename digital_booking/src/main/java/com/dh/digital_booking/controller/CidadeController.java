package com.dh.digital_booking.controller;

import com.dh.digital_booking.entity.CidadeEntity;
import com.dh.digital_booking.exceptions.BadRequestException;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.CidadeService;
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
@CrossOrigin(origins = "*")
@RequestMapping(value = "/cidade")
@Tag(description = "Cidades que serão utilizadas nos produtos", name = "Cidade")
public class CidadeController {
    final static Logger log = Logger.getLogger(String.valueOf(CidadeController.class));

    @Autowired
    private CidadeService cidadeService;
    @Operation(summary = "Buscar todas as cidades")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CidadeEntity.class))
    })
    @GetMapping
    public ResponseEntity<List<CidadeEntity>> buscarTodasCidades() throws ResourceNotFoundException {
        try {
            log.info("Realizando a busca de todas as cidades");
            List<CidadeEntity> list = cidadeService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todas as cidades " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar as cidades");
        }
    }

    @Operation(summary = "Buscar cidade pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CidadeEntity.class))
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<CidadeEntity>> buscarCidadePorId(@PathVariable Long id) throws ResourceNotFoundException{
        try {
            log.info("Buscando a cidade pelo ID: " + id);
            return cidadeService.findById(id);
        } catch (Exception e) {
            log.error("Não foi possível realizar a busca da cidade de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar a cidade");
        }
    }

    @Operation(summary = "Criar uma cidade")
    @ApiResponse(responseCode = "201", description = "Criada", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CidadeEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping
    public ResponseEntity<CidadeEntity> adicionarCidade(@RequestBody CidadeEntity categoriaEntity) throws BadRequestException {
        try {
            log.info("Realizando a adição de uma nova cidade");
            return new ResponseEntity<>(cidadeService.adicionar(categoriaEntity), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Erro ao realizar adição da cidade " + e.getMessage());
            throw new BadRequestException("Não foi possível salvar a cidade informada");
        }
    }

    @Operation(summary = "Deletar cidade pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CidadeEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteCidade(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            log.info("Excluindo cidade de ID: " + id);
            return cidadeService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão da cidade de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar a cidade de ID: " + id + " - " + e.getMessage());
        }
    }

    @Operation(summary = "Atualizar uma cidade")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CidadeEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping(value = "/atualizar/{id}")
    public CidadeEntity atualizarCategoria(@PathVariable Long id ,@RequestBody CidadeEntity categoriaEntity) throws ResourceNotFoundException {
        try {
            log.info("Atualizando a cidade.");
            return cidadeService.atualizar(id,categoriaEntity);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o cidade.");
            throw new ResourceNotFoundException("Cidade não foi encontrada para ser atualizado. " + e.getMessage());
        }
    }
}