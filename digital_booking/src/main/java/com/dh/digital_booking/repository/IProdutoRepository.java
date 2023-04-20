package com.dh.digital_booking.repository;

import com.dh.digital_booking.entity.ProdutoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProdutoRepository extends JpaRepository<ProdutoEntity, Long> {
    @Query("from ProdutoEntity p where p.categoria.qualificacao like :qualificacao")
    List<ProdutoEntity> findByQualificacaoCategoria(String qualificacao);

    @Query("from ProdutoEntity p where p.cidade.nome like :nomeCidade")
    List<ProdutoEntity> findByNomeCidade(String nomeCidade);
}
