package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.entity.FuncaoEntity;
import com.dh.digital_booking.repository.IFuncoesRepository;
import com.dh.digital_booking.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncaoService implements IHotelService<FuncaoEntity> {
    @Autowired
    private IFuncoesRepository funcoesRepository;

    @Override
    public List<FuncaoEntity> findAll() {
        return funcoesRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<FuncaoEntity>> findById(Long id) {
        Optional<FuncaoEntity> funcoes;
        funcoes = funcoesRepository.findById(id);
        if (funcoes.isPresent()){
            return new ResponseEntity<>(funcoes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public FuncaoEntity adicionar(FuncaoEntity funcaoEntity) {
        if (funcaoEntity != null) {
            return funcoesRepository.save(funcaoEntity);
        }
        return new FuncaoEntity();
    }

    @Override
    public ResponseEntity<String> deletar(Long id) {
        if(funcoesRepository.findById(id).isPresent()){
            funcoesRepository.deleteById(id);
            return ResponseEntity.ok().body("Função apagada!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Função não encontrada!");
    }

    @Override
    public FuncaoEntity atualizar(Long id, FuncaoEntity funcaoEntity) {
        if(funcaoEntity != null && funcoesRepository.findById(id).isPresent()) {
            FuncaoEntity existingFuncao = funcoesRepository.findById(id).get();

            existingFuncao.setNome(funcaoEntity.getNome());
            existingFuncao.setUsers(funcaoEntity.getUsers());
            return funcoesRepository.save(existingFuncao);
        }
        return new FuncaoEntity();
    }
}
