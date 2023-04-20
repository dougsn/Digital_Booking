package com.dh.digital_booking.controller;

import com.dh.digital_booking.entity.ClassificacaoEntity;
import com.dh.digital_booking.entity.ImagemEntity;
import com.dh.digital_booking.exceptions.BadRequestException;
import com.dh.digital_booking.exceptions.ResourceNotFoundException;
import com.dh.digital_booking.service.impl.ImagemService;
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
@RequestMapping (value = "/imagem")
@Tag(description = "Imagem que será utilizada no Produto", name = "Imagem")
public class ImagemController {
    final static Logger log = Logger.getLogger(String.valueOf(ImagemController.class));

    @Autowired
    private ImagemService imagemService;

    @Operation(summary = "Buscar todos as imagens")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ImagemEntity.class))
    })
    @GetMapping
    public ResponseEntity<List<ImagemEntity>> buscarTodasImagens() throws ResourceNotFoundException {
        try {
            log.info("Realizando a busca de todas as imagens");
            List<ImagemEntity> list = imagemService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível realizar a busca de todas as imagens " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar as imagens");
        }
    }
    @Operation(summary = "Buscar imagem pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ImagemEntity.class))
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<ImagemEntity>> buscarImagemPorId(@PathVariable Long id) throws ResourceNotFoundException{
        try {
            log.info("Buscando a imagem pelo ID: " + id);
            return imagemService.findById(id);
        } catch (Exception e) {
            log.error("Não foi possível realizar a busca da imagem de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível buscar a imagem");
        }
    }

    @Operation(summary = "Criar imagem")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ImagemEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping
    public ResponseEntity<ImagemEntity> adicionarImagem(@RequestBody ImagemEntity imagemEntity) throws BadRequestException {
        try {
            log.info("Realizando a adição de uma nova imagem");
            return new ResponseEntity<>(imagemService.adicionar(imagemEntity), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Erro ao realizar adição da imagem " + e.getMessage());
            throw new BadRequestException("Não foi possível salvar a imagem informada");
        }
    }
    @Operation(summary = "Deletar imagem pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ImagemEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteImagem(@PathVariable Long id) throws ResourceNotFoundException {

        try {
            log.info("Excluindo imagem de ID: " + id);
            return imagemService.deletar(id);
        }catch (Exception e){
            log.error("Não foi possível realizar a exclusão da imagem de ID: " + id + " - " + e.getMessage());
            throw new ResourceNotFoundException("Não foi possível deletar a imagem de ID: " + id + " - " + e.getMessage());
        }
    }
    @Operation(summary = "Atualizar imagem")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = ImagemEntity.class))
    })
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping(value = "/atualizar/{id}")
    public ImagemEntity atualizarImagem(@PathVariable Long id, @RequestBody ImagemEntity imagemEntity) throws ResourceNotFoundException {
        try {
            log.info("Atualizando a imagem.");
            return imagemService.atualizar(id, imagemEntity);
        } catch (Exception e) {
            log.error("Não foi possível atualizar o imagem.");
            throw new ResourceNotFoundException("Imagem não foi encontrada para ser atualizado. " + e.getMessage());
        }
    }
}
