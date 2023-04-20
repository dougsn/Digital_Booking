package com.dh.digital_booking.controller;

import com.dh.digital_booking.entity.ClassificacaoEntity;
import com.dh.digital_booking.entity.ProdutoEntity;
import com.dh.digital_booking.entity.ReservaEntity;
import com.dh.digital_booking.exceptions.BadRequestException;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.ProdutoService;
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
@RequestMapping (value = "/produto")
@Tag(description = "Produto da aplicação", name = "Produto")
public class ProdutoController {

    final static Logger log = Logger.getLogger(String.valueOf(ProdutoController.class));

    @Autowired
    private ProdutoService produtoService;


    @Operation(summary = "Buscar todos as produtos")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoEntity.class))
    })
    @GetMapping
    public ResponseEntity<List<ProdutoEntity>> buscarTodosProdutos() throws ResourceNotFoundException {
        try {
            log.info("Realizando a busca de todos os produtos");
            List<ProdutoEntity> list = produtoService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todos os produtos " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar os produtos");
        }
    }
    @Operation(summary = "Buscar os Produtos pela Categoria")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoEntity.class))
    })
    @GetMapping(value = "/categoria")
    public List<ProdutoEntity> buscarProdutoQualificacaoCategoria(@RequestParam String qualificacao) {
        return produtoService.buscarProdutoQualificacaoCategoria(qualificacao);
    }
    @Operation(summary = "Buscar os Produtos pela Cidade")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoEntity.class))
    })
    @GetMapping(value = "/cidade")
    public List<ProdutoEntity> buscarProdutoNomeCidade(@RequestParam String nomeCidade) {
        return produtoService.buscarProdutoNomeCidade(nomeCidade);
    }
    @Operation(summary = "Buscar Reserva por ID do Produto")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoEntity.class))
    })
    @GetMapping("/buscarReserva/{id}")
    public List<ReservaEntity> buscarReservaPorIdProduto(@PathVariable Long id){
        return produtoService.buscarReservaPorIdProduto(id);
    }
    @Operation(summary = "Buscar produto pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoEntity.class))
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<ProdutoEntity>> buscarProdutoPorId(@PathVariable Long id) throws ResourceNotFoundException{
        try {
            log.info("Buscando o produto pelo ID: " + id);
            return produtoService.findById(id);
        } catch (Exception e) {
            log.error("Não foi possível realizar a busca do produto de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar o produto");
        }
    }
    @Operation(summary = "Criar produto")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/adicionar")
    public ResponseEntity<ProdutoEntity> adicionarProduto(@RequestBody ProdutoEntity produtoEntity) throws BadRequestException {
        try {
            log.info("Realizando a adição de uma nova produto");
            return new ResponseEntity<>(produtoService.adicionar(produtoEntity), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Erro ao realizar adição do produto " + e.getMessage());
            throw new BadRequestException("Não foi possível salvar o produto informado");
        }
    }
    @Operation(summary = "Deletar produto")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteProduto(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            log.info("Excluindo produto de ID: " + id);
            return produtoService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão do produto de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar o produto de ID: " + id + " - " + e.getMessage());
        }
    }
    @Operation(summary = "Atualizar produto")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/atualizar/{id}")
    public ProdutoEntity atualizarProduto(@PathVariable Long id, @RequestBody ProdutoEntity produtoEntity) throws ResourceNotFoundException {
        try {
            log.info("Atualizando o produto.");
            return produtoService.atualizar(id,produtoEntity);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o produto.");
            throw new ResourceNotFoundException("Produto não foi encontrado para ser atualizado. " + e.getMessage());
        }
    }
}
