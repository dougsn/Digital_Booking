package com.dh.digital_booking.controller;

import com.dh.digital_booking.entity.ClassificacaoEntity;
import com.dh.digital_booking.entity.FavoritoEntity;
import com.dh.digital_booking.entity.ProdutoEntity;
import com.dh.digital_booking.exceptions.BadRequestException;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.FavoritoService;
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
@RequestMapping(value = "/favorito")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(description = "Favoritos do usuário", name = "Favorito")
public class FavoritoController {
    final static Logger log = Logger.getLogger(String.valueOf(FavoritoController.class));

    @Autowired
    private FavoritoService favoritoService;

    @Operation(summary = "Buscar todos os favoritos")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FavoritoEntity.class))
    })
    @GetMapping
    public ResponseEntity<List<FavoritoEntity>> buscarTodosOsFavoritos() throws ResourceNotFoundException {
        try {
            log.info("Realizando a busca de todos os favoritos");
            List<FavoritoEntity> list = favoritoService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todos os favoritos" + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar os favoritos");
        }
    }

    @Operation(summary = "Buscar favorito pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FavoritoEntity.class))
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<FavoritoEntity>> buscarFavoritoPorId(@PathVariable Long id) throws ResourceNotFoundException{
        try {
            log.info("Buscando o Favorito pelo ID: " + id);
            return favoritoService.findById(id);
        } catch (Exception e) {
            log.error("Não foi possível realizar a busca do Favorito de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar o Favorito");
        }
    }

    @Operation(summary = "Favoritar Produto")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FavoritoEntity.class))
    })
    @PostMapping
    public ResponseEntity<FavoritoEntity> adicionarFavorito(@RequestBody FavoritoEntity favorito) throws BadRequestException {
        try {
            log.info("Realizando a adição de um novo Favorito");
            return new ResponseEntity<>(favoritoService.adicionar(favorito), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Erro ao realizar adição do Favorito " + e.getMessage());
            throw new BadRequestException("Não foi possível salvar o Favorito informado");
        }
    }

    @Operation(summary = "Deletar favorito pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FavoritoEntity.class))
    })
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteFavorito(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            log.info("Excluindo Favorito de ID: " + id);
            return favoritoService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão do Favorito de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar o Favorito de ID: " + id + " - " + e.getMessage());
        }
    }

    @Operation(summary = "Atualizar favorito")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FavoritoEntity.class))
    })
    @PutMapping(value = "/atualizar/{id}")
    public FavoritoEntity atualizarFavorito(@PathVariable Long id, @RequestBody FavoritoEntity favorito) throws ResourceNotFoundException {
        try {
            log.info("Atualizando o Favorito.");
            return favoritoService.atualizar(id,favorito);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o Favorito.");
            throw new ResourceNotFoundException("Favorito não foi encontrado para ser atualizado. " + e.getMessage());
        }
    }

    @Operation(summary = "Buscar lista de Favoritos do Usuário logado")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FavoritoEntity.class))
    })
    @GetMapping("/favoritoUser")
    public List<ProdutoEntity> ProdutoFavoritoUser() {
        return favoritoService.ProdutoFavoritoUser();
    }

    @Operation(summary = "Verificar se o Produto passado por ID está favoritado pelo Usuário logado")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FavoritoEntity.class))
    })
    @GetMapping("/isFavorito/{id}")
    public boolean isFavorito(@PathVariable Long id) {
        return favoritoService.isFavorito(id);
    }
    @Operation(summary = "Deletar favorito pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = FavoritoEntity.class))
    })

    @DeleteMapping
    public ResponseEntity<String> deletarFavorito(@RequestBody FavoritoEntity favoritoEntity) {
        return favoritoService.deletarFavorito(favoritoEntity);
    }
}
