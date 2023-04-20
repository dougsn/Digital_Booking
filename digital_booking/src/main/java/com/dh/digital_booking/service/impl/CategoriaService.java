package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.entity.CategoriaEntity;
import com.dh.digital_booking.repository.ICategoriaRepository;
import com.dh.digital_booking.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CategoriaService implements IHotelService<CategoriaEntity> {
    @Autowired
    private  ICategoriaRepository categoriaRepository;

    @Override
    public List<CategoriaEntity> findAll() {
        return categoriaRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<CategoriaEntity>> findById(Long id) {
        Optional<CategoriaEntity> categoria;
        categoria = categoriaRepository.findById(id);
        if (categoria.isPresent()){
            return new ResponseEntity<>(categoria, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public CategoriaEntity adicionar(CategoriaEntity categoriaEntity) {
        if (categoriaEntity != null) {
            return categoriaRepository.save(categoriaEntity);
        }
        return new CategoriaEntity();
    }

    @Override
    public ResponseEntity<String> deletar(Long id) {
        if(categoriaRepository.findById(id).isPresent()){
            categoriaRepository.deleteById(id);
            return ResponseEntity.ok().body("Categoria apagada!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria não encontrada!");
    }

    @Override
    public CategoriaEntity atualizar(Long id, CategoriaEntity categoriaEntity){
        if(categoriaEntity != null && categoriaRepository.findById(id).isPresent()) {
            CategoriaEntity existingCategoria = categoriaRepository.findById(id).get();
            existingCategoria.setDescricao(categoriaEntity.getDescricao());
            existingCategoria.setQualificacao(categoriaEntity.getQualificacao());
            existingCategoria.setUrlImagem(categoriaEntity.getUrlImagem());
            existingCategoria.setProdutos(categoriaEntity.getProdutos());
            return categoriaRepository.save(existingCategoria);
        }
        return new CategoriaEntity();
    }
}