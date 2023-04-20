package com.dh.digital_booking.controller;

import com.dh.digital_booking.entity.CategoriaEntity;
import com.dh.digital_booking.entity.ClassificacaoEntity;
import com.dh.digital_booking.exceptions.BadRequestException;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.ClassificacaoService;
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
@SecurityRequirement(name = "Bearer Authentication")
@RequestMapping(value = "/classificacao")
@Tag(description = "Classificação que será dada pelo Usuário no Produto", name = "Classificação")
public class ClassificacaoController {
    final static Logger log = Logger.getLogger(String.valueOf(ClassificacaoController.class));

    @Autowired
    private ClassificacaoService classificacaoService;
    @Operation(summary = "Buscar todos as classificações")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ClassificacaoEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<ClassificacaoEntity>> buscarTodasClassificacoes() throws ResourceNotFoundException {

        try {
            log.info("Realizando a busca de todas as classificações");
            List<ClassificacaoEntity> list = classificacaoService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todas as classificações " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar as classificações");

        }
    }

    @Operation(summary = "Buscar classificação pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ClassificacaoEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<ClassificacaoEntity>> buscarClassificacaoPorId(@PathVariable Long id) throws ResourceNotFoundException{
        try {
            log.info("Buscando a classificação pelo ID: " + id);
            return classificacaoService.findById(id);
        } catch (Exception e) {
            log.error("Não foi possível realizar a busca da classificação de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar a classificação");
        }
    }

    @Operation(summary = "Classificar Produto")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ClassificacaoEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @PostMapping
    public ResponseEntity<ClassificacaoEntity> adicionarClassificacao(@RequestBody ClassificacaoEntity classificacao) throws BadRequestException {
        try {
            log.info("Realizando a adição de uma nova classificação");
            return new ResponseEntity<>(classificacaoService.adicionar(classificacao), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Erro ao realizar adição da classificação " + e.getMessage());
            throw new BadRequestException("Não foi possível salvar a classificação informada");
        }
    }

    @Operation(summary = "Deletar classificação pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ClassificacaoEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteClassificacao(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            log.info("Excluindo classificação de ID: " + id);
            return classificacaoService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão da classificação de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar a classificação de ID: " + id + " - " + e.getMessage());
        }
    }

    @Operation(summary = "Atualizar classificação")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ClassificacaoEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @PutMapping(value = "/atualizar/{id}")
    public ClassificacaoEntity atualizarClassificacao(@PathVariable Long id, @RequestBody ClassificacaoEntity classificacao) throws ResourceNotFoundException {
        try {
            log.info("Atualizando a classificação.");
            return classificacaoService.atualizar(id, classificacao);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o classificação.");
            throw new ResourceNotFoundException("Classificação não foi encontrada para ser atualizado. " + e.getMessage());
        }
    }
}
