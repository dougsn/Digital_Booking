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

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "Funcoes")
public class FuncaoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(type = "string", allowableValues = {"ADMIN"})
    @NotNull
    private String nome;

    @JsonIgnore
    @OneToMany()
    @JoinColumn(name = "funcoes_id")
    private Set<UserEntity> users = new HashSet<>();

    public FuncaoEntity(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }
}
