package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.entity.CaracteristicaEntity;
import com.dh.digital_booking.repository.ICaracteristicaRepository;
import com.dh.digital_booking.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService implements IHotelService<CaracteristicaEntity> {
    @Autowired
    private ICaracteristicaRepository caracteristicaRepository;

    @Override
    public List<CaracteristicaEntity> findAll() {
        return caracteristicaRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<CaracteristicaEntity>> findById(Long id) {
        Optional<CaracteristicaEntity> caracteristica;
        caracteristica = caracteristicaRepository.findById(id);
        if (caracteristica.isPresent()){
            return new ResponseEntity<>(caracteristica, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public CaracteristicaEntity adicionar(CaracteristicaEntity caracteristicaEntity) {
        if (caracteristicaEntity != null) {
            return caracteristicaRepository.save(caracteristicaEntity);
        }
        return new CaracteristicaEntity();
    }

    @Override
    public ResponseEntity<String> deletar(Long id) {
        if(caracteristicaRepository.findById(id).isPresent()){
            caracteristicaRepository.deleteById(id);
            return ResponseEntity.ok().body("Caracteristica apagada!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Caracteristica não encontrada!");
    }

    @Override
    public CaracteristicaEntity atualizar(Long id, CaracteristicaEntity caracteristicaEntity){
        if(caracteristicaEntity != null && caracteristicaRepository.findById(id).isPresent()) {
            CaracteristicaEntity existingCaracteristica = caracteristicaRepository.findById(id).get();
            existingCaracteristica.setIcone(caracteristicaEntity.getIcone());
            existingCaracteristica.setNome(caracteristicaEntity.getNome());
            existingCaracteristica.setProdutos(caracteristicaEntity.getProdutos());
            return caracteristicaRepository.save(existingCaracteristica);
        }
        return new CaracteristicaEntity();
    }
}