package com.dh.digital_booking.controller;

import com.dh.digital_booking.entity.CaracteristicaEntity;
import com.dh.digital_booking.entity.CategoriaEntity;
import com.dh.digital_booking.exceptions.BadRequestException;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.CategoriaService;
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
@RequestMapping (value = "/categoria")
@Tag(description = "Categorias que serão utilizadas nos produtos", name = "Categoria")
public class CategoriaController {
    final static Logger log = Logger.getLogger(String.valueOf(CategoriaController.class));

    @Autowired
    private CategoriaService categoriaService;

    @Operation(summary = "Buscar todos as categorias")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CategoriaEntity.class))
    })
    @GetMapping
    public ResponseEntity<List<CategoriaEntity>> buscarTodasCategorias() throws ResourceNotFoundException {
        try {
            log.info("Realizando a busca de todas as categorias");
            List<CategoriaEntity> list = categoriaService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todas as categorias " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar as categorias");
        }
    }

    @Operation(summary = "Buscar categoria pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CategoriaEntity.class))
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<CategoriaEntity>> buscarCategoriaPorId(@PathVariable Long id) throws ResourceNotFoundException{
        try {
            log.info("Buscando a categoria pelo ID: " + id);
            return categoriaService.findById(id);
        } catch (Exception e) {
            log.error("Não foi possível realizar a busca da categoria de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar a categoria");
        }
    }

    @Operation(summary = "Criar categoria")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CategoriaEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping
    public ResponseEntity<CategoriaEntity> adicionarCategoria(@RequestBody CategoriaEntity categoriaEntity) throws BadRequestException {
        try {
            log.info("Realizando a adição de uma nova categoria");
            return new ResponseEntity<>(categoriaService.adicionar(categoriaEntity), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Erro ao realizar adição da categoria " + e.getMessage());
            throw new BadRequestException("Não foi possível salvar a categoria informada");
        }
    }

    @Operation(summary = "Deletar categoria pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CategoriaEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteCategoria(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            log.info("Excluindo categoria de ID: " + id);
            return categoriaService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão da categoria de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar a categoria de ID: " + id + " - " + e.getMessage());
        }
    }

    @Operation(summary = "Atualizar categoria")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = CategoriaEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping(value = "/atualizar/{id}")
    public CategoriaEntity atualizarCategoria(@PathVariable Long id, @RequestBody CategoriaEntity categoriaEntity) throws ResourceNotFoundException {
        try {
            log.info("Atualizando a categoria.");
            return categoriaService.atualizar(id, categoriaEntity);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o categoria.");
            throw new ResourceNotFoundException("Categoria não foi encontrada para ser atualizado. " + e.getMessage());
        }
    }
}