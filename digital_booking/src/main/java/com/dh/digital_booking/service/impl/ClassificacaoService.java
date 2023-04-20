package com.dh.digital_booking.service.impl;
import com.dh.digital_booking.entity.ClassificacaoEntity;
import com.dh.digital_booking.entity.ProdutoEntity;
import com.dh.digital_booking.entity.UserEntity;
import com.dh.digital_booking.repository.IClassificacaoRepository;
import com.dh.digital_booking.repository.IProdutoRepository;
import com.dh.digital_booking.repository.IUserRepository;
import com.dh.digital_booking.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ClassificacaoService implements IHotelService<ClassificacaoEntity> {
    @Autowired
    private IClassificacaoRepository classificacaoRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IProdutoRepository produtoRepository;

    @Override
    public List<ClassificacaoEntity> findAll() {
        return classificacaoRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<ClassificacaoEntity>> findById(Long id) {
        Optional<ClassificacaoEntity> classificacao;
        classificacao = classificacaoRepository.findById(id);
        if (classificacao.isPresent()){
            return new ResponseEntity<>(classificacao, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ClassificacaoEntity adicionar(ClassificacaoEntity classificacaoEntity) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String id = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(id).get();

        Long productId = classificacaoEntity.getProduto().getId();
        ProdutoEntity produto = produtoRepository.findById(productId).get();

        classificacaoEntity.setUser(userEntity);
        classificacaoEntity.setProduto(produto);
        if (classificacaoEntity != null) {
            return classificacaoRepository.save(classificacaoEntity);
        }
        return new ClassificacaoEntity();
    }

    @Override
    public ResponseEntity<String> deletar(Long id) {
        if(classificacaoRepository.findById(id).isPresent()){
            classificacaoRepository.deleteById(id);
            return ResponseEntity.ok().body("Classificação apagada!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Classificação não encontrada!");
    }

    @Override
    public ClassificacaoEntity atualizar(Long id, ClassificacaoEntity classificacaoEntity) {
        if(classificacaoEntity != null && classificacaoRepository.findById(id).isPresent()) {
            ClassificacaoEntity existingClassificacao = classificacaoRepository.findById(id).get();

            Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
            String idUser = (String) principal;
            UserEntity userEntity = userRepository.findByEmail(idUser).get();

            existingClassificacao.setUser(userEntity);

            Long productId = classificacaoEntity.getProduto().getId();
            ProdutoEntity produto = produtoRepository.findById(productId).get();

            existingClassificacao.setProduto(produto);

            existingClassificacao.setPontuacao(classificacaoEntity.getPontuacao());
            return classificacaoRepository.save(existingClassificacao);
        }
        return new ClassificacaoEntity();
    }
}