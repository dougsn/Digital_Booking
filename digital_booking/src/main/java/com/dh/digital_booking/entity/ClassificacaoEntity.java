package com.dh.digital_booking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "Classificacoes")
public class ClassificacaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    @Schema(type = "string", allowableValues = {"{id: 1}"})
    private ProdutoEntity produto;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "_user_id")
    private UserEntity user;

    @Schema(type = "int", allowableValues = {"3"})
    @NotNull
    private Integer pontuacao;
}
