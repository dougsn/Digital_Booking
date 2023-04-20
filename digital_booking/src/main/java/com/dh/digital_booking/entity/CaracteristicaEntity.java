package com.dh.digital_booking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "Caracteristicas")
public class CaracteristicaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres")
    @Schema(type = "string", allowableValues = {"WI-FI"})
    private String nome;
    @ManyToOne(fetch = FetchType.EAGER)
    @Schema(type = "string", allowableValues = {"{id: 1}"})
    @NotNull
    @JoinColumn(name = "icone_id")
    private IconeEntity icone;
    @JsonIgnore
    @ManyToMany(mappedBy = "caracteristicas")
    private Set<ProdutoEntity> produtos = new HashSet<>();



}
