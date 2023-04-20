package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.entity.IconeEntity;
import com.dh.digital_booking.repository.IIconeRepository;
import com.dh.digital_booking.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class IconeService implements IHotelService<IconeEntity> {

    @Autowired
    private IIconeRepository iconeRepository;

    @Override
    public List<IconeEntity> findAll() {
        return iconeRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<IconeEntity>> findById(Long id) {
        Optional<IconeEntity> icone;

        icone = iconeRepository.findById(id);

        if (icone.isPresent()){
            return new ResponseEntity<>(icone, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public IconeEntity adicionar(IconeEntity iconeEntity) throws Exception {
        if (iconeEntity != null) {
            return iconeRepository.save(iconeEntity);
        }
        return new IconeEntity();
    }

    @Override
    public ResponseEntity<String> deletar(Long id) {
        if(iconeRepository.findById(id).isPresent()){
            iconeRepository.deleteById(id);
            return ResponseEntity.ok().body("Icone apagado!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Icone não encontrado!");
    }

    @Override
    public IconeEntity atualizar(Long id, IconeEntity iconeEntity) throws Exception {
        if(iconeEntity != null && iconeRepository.findById(id).isPresent()) {
            IconeEntity existingIcone = iconeRepository.findById(id).get();

            existingIcone.setNome(iconeEntity.getNome());
            existingIcone.setNome_icone(iconeEntity.getNome_icone());
            existingIcone.setCaracteristicas(iconeEntity.getCaracteristicas());

            return iconeRepository.save(existingIcone);

        }
        return new IconeEntity();
    }
}
