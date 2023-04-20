package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.entity.ImagemEntity;
import com.dh.digital_booking.repository.IImagemRepository;
import com.dh.digital_booking.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImagemService implements IHotelService<ImagemEntity> {
    @Autowired
    private IImagemRepository imagemRepository;

    @Override
    public List<ImagemEntity> findAll() {
        return imagemRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<ImagemEntity>> findById(Long id) {
        Optional<ImagemEntity> imagem;
        imagem = imagemRepository.findById(id);
        if (imagem.isPresent()){
            return new ResponseEntity<>(imagem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ImagemEntity adicionar(ImagemEntity imagemEntity) {
        if (imagemEntity != null) {
            return imagemRepository.save(imagemEntity);
        }
        return new ImagemEntity();
    }

    @Override
    public ResponseEntity<String> deletar(Long id) {
        if(imagemRepository.findById(id).isPresent()){
            imagemRepository.deleteById(id);
            return ResponseEntity.ok().body("Imagem apagada!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imagem não encontrada!");
    }

    @Override
    public ImagemEntity atualizar(Long id, ImagemEntity imagemEntity){
        if(imagemEntity != null && imagemRepository.findById(id).isPresent()) {
            ImagemEntity existingImagem = imagemRepository.findById(id).get();

            existingImagem.setProduto(imagemEntity.getProduto());
            existingImagem.setTitulo(imagemEntity.getTitulo());
            existingImagem.setUrl(imagemEntity.getUrl());
            return imagemRepository.save(existingImagem);
        }
        return new ImagemEntity();
    }
}
