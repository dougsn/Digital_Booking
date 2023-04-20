package com.dh.digital_booking.repository;

import com.dh.digital_booking.entity.ProdutoEntity;
import com.dh.digital_booking.entity.ReservaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface IReservaRepository extends JpaRepository<ReservaEntity, Long> {
    @Query("SELECT p FROM ProdutoEntity p WHERE p.id NOT IN (SELECT r.produto.id FROM ReservaEntity r " +
            "WHERE (:dataInicio >= r.data_inicio_reserva AND :dataInicio <= r.data_fim_reserva)" +
            "OR (:dataFim >= r.data_inicio_reserva AND :dataFim <= r.data_fim_reserva)" +
            "OR (r.data_inicio_reserva > :dataInicio AND r.data_fim_reserva < :dataFim))")
    List<ProdutoEntity> consultaReservaPorData(LocalDate dataInicio, LocalDate dataFim);
    
    @Query("SELECT p FROM ProdutoEntity p "+
            "WHERE p.cidade.nome like :cidade " +
            "AND p.id NOT IN (SELECT r.produto.id FROM ReservaEntity r " +
            "WHERE (:dataInicio >= r.data_inicio_reserva AND :dataInicio <= r.data_fim_reserva)" +
            "OR (:dataFim >= r.data_inicio_reserva AND :dataFim <= r.data_fim_reserva)" +
            "OR (r.data_inicio_reserva > :dataInicio AND r.data_fim_reserva < :dataFim))")
    List<ProdutoEntity> consultaReservaPorDataCidade(String cidade, LocalDate dataInicio, LocalDate dataFim);
}
