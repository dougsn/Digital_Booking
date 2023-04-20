package com.dh.digital_booking.controller;

import com.dh.digital_booking.entity.ClassificacaoEntity;
import com.dh.digital_booking.entity.FuncaoEntity;
import com.dh.digital_booking.exceptions.BadRequestException;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.FuncaoService;
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
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "Bearer Authentication")
@RequestMapping(value = "/funcao")
@Tag(description = "Função do usuário (Permissionamento)", name = "Função")

public class FuncaoController {

    final static Logger log = Logger.getLogger(String.valueOf(FuncaoController.class));

    @Autowired
    private FuncaoService funcaoService;
    @Operation(summary = "Buscar todos as funções do sistema")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FuncaoEntity.class))
    })
    @GetMapping
    public ResponseEntity<List<FuncaoEntity>> buscarTodasFuncoes() throws ResourceNotFoundException {
        try {
            log.info("Realizando a busca de todas as funções");
            List<FuncaoEntity> list = funcaoService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todas as funções " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar as funções");
        }
    }
    @Operation(summary = "Buscar função pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FuncaoEntity.class))
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<FuncaoEntity>> buscarFuncaoPorId(@PathVariable Long id) throws ResourceNotFoundException{
        try {
            log.info("Buscando a função pelo ID: " + id);
            return funcaoService.findById(id);

        } catch (Exception e) {
            log.error("Não foi possível realizar a busca da função de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar a função");
        }
    }
    @Operation(summary = "Criar função")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FuncaoEntity.class))
    })
    @PostMapping
    public ResponseEntity<FuncaoEntity> adicionarFuncao(@RequestBody FuncaoEntity funcaoEntity) throws BadRequestException {
        try {
            log.info("Realizando a adição de uma nova função");
            return new ResponseEntity<>(funcaoService.adicionar(funcaoEntity), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Erro ao realizar adição da função " + e.getMessage());
            throw new BadRequestException("Não foi possível salvar a função informada");
        }
    }
    @Operation(summary = "Deletar função pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FuncaoEntity.class))
    })
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteFuncao(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            log.info("Excluindo função de ID: " + id);
            return funcaoService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão da função de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar a função de ID: " + id + " - " + e.getMessage());
        }
    }
    @Operation(summary = "Atualizar função")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FuncaoEntity.class))
    })
    @PutMapping(value = "/atualizar/{id}")
    public FuncaoEntity atualizarFuncao(@PathVariable Long id, @RequestBody FuncaoEntity funcaoEntity) throws ResourceNotFoundException {
        try {
            log.info("Atualizando a função.");
            return funcaoService.atualizar(id, funcaoEntity);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o função.");
            throw new ResourceNotFoundException("Função não foi encontrada para ser atualizado. " + e.getMessage());
        }
    }
}
