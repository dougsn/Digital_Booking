package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.entity.ProdutoEntity;
import com.dh.digital_booking.entity.ReservaEntity;
import com.dh.digital_booking.entity.UserEntity;
import com.dh.digital_booking.repository.IProdutoRepository;
import com.dh.digital_booking.repository.IReservaRepository;
import com.dh.digital_booking.repository.IUserRepository;
import com.dh.digital_booking.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProdutoService implements IHotelService<ProdutoEntity> {

    @Autowired
    private IProdutoRepository produtoRepository;

    @Autowired
    private IReservaRepository reservaRepository;

    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<ProdutoEntity> findAll() {
        return produtoRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<ProdutoEntity>> findById(Long id) {
        Optional<ProdutoEntity> produto;
        produto = produtoRepository.findById(id);

        if (produto.isPresent()){
            return new ResponseEntity<>(produto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public List<ProdutoEntity> buscarProdutoQualificacaoCategoria(String qualificacao) {
        return produtoRepository.findByQualificacaoCategoria("%" + qualificacao + "%");
    }

    public List<ProdutoEntity> buscarProdutoNomeCidade(String nomeCidade) {
        return produtoRepository.findByNomeCidade("%" + nomeCidade + "%");
    }

    public List<ReservaEntity> buscarReservaPorIdProduto(Long id){
        ProdutoEntity existingProduto = produtoRepository.findById(id).get();
        Set<ReservaEntity> reservasProduto = existingProduto.getReservas();
        List<ReservaEntity> reservaProd = new ArrayList<>();

        for (ReservaEntity reserva : reservasProduto) {
            ReservaEntity existingReserva = reservaRepository.findById(reserva.getId()).get();
            if (Objects.equals(existingReserva.getId(), reserva.getId())){
                reservaProd.add(existingReserva);
            }
        }
        return reservaProd;
    }

    @Override
    public ProdutoEntity adicionar(ProdutoEntity produtoEntity) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(idUser).get();

        produtoEntity.setUser(userEntity);

        if (produtoEntity != null) {
            return produtoRepository.save(produtoEntity);
        }
        return new ProdutoEntity();
    }

    @Override
    public ResponseEntity<String> deletar(Long id) {
        if(produtoRepository.findById(id).isPresent()){
            produtoRepository.deleteById(id);
            return ResponseEntity.ok().body("Produto apagada!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrada!");
    }

    @Override
    public ProdutoEntity atualizar(Long id, ProdutoEntity produtoEntity){
        if(produtoEntity != null && produtoRepository.findById(id).isPresent()) {
            ProdutoEntity existingProduto = produtoRepository.findById(id).get();


            existingProduto.setNome(produtoEntity.getNome());
            existingProduto.setDescricao(produtoEntity.getDescricao());
            existingProduto.setRegras_da_casa(produtoEntity.getRegras_da_casa());
            existingProduto.setSaude_e_seguranca(produtoEntity.getSaude_e_seguranca());
            existingProduto.setPolitica_de_cancelamento(produtoEntity.getPolitica_de_cancelamento());
            existingProduto.setEndereco(produtoEntity.getEndereco());
            existingProduto.setImagem_default(produtoEntity.getImagem_default());
            existingProduto.setImagens(produtoEntity.getImagens());
            existingProduto.setCategoria(produtoEntity.getCategoria());
            existingProduto.setCidade(produtoEntity.getCidade());
            existingProduto.setCaracteristicas(produtoEntity.getCaracteristicas());

            return produtoRepository.save(existingProduto);
        }
        return new ProdutoEntity();
    }
}
