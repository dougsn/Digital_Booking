package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.entity.CidadeEntity;
import com.dh.digital_booking.repository.ICidadeRepository;
import com.dh.digital_booking.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CidadeService implements IHotelService<CidadeEntity> {
    @Autowired
    private ICidadeRepository cidadeRepository;

    @Override
    public List<CidadeEntity> findAll() {
        return cidadeRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<CidadeEntity>> findById(Long id) {
        Optional<CidadeEntity> cidade;
        cidade = cidadeRepository.findById(id);
        if (cidade.isPresent()){
            return new ResponseEntity<>(cidade, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public CidadeEntity adicionar(CidadeEntity cidadeEntity) {
        if (cidadeEntity != null) {
            return cidadeRepository.save(cidadeEntity);
        }
        return new CidadeEntity();
    }

    @Override
    public ResponseEntity<String> deletar(Long id) {
        if(cidadeRepository.findById(id).isPresent()){
            cidadeRepository.deleteById(id);
            return ResponseEntity.ok().body("Cidade apagada!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cidade não encontrada!");
    }

    @Override
    public CidadeEntity atualizar(Long id, CidadeEntity cidadeEntity) {
        if(cidadeEntity != null && cidadeRepository.findById(id).isPresent()) {
            CidadeEntity existingCidade = cidadeRepository.findById(id).get();
            existingCidade.setNome(cidadeEntity.getNome());
            existingCidade.setPais(cidadeEntity.getPais());
            existingCidade.setEstado(cidadeEntity.getEstado());
            existingCidade.setProdutos(cidadeEntity.getProdutos());
            return cidadeRepository.save(existingCidade);
        }
        return new CidadeEntity();
    }
}