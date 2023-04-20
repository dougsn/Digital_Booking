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
@Table(name = "Icones")
public class IconeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Schema(type = "string", allowableValues = {"wi-fi"})
    private String nome;
    @NotNull
    @Schema(type = "string", allowableValues = {"#wi-fi"})
    private String nome_icone;

    @OneToMany(mappedBy = "icone", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<CaracteristicaEntity> caracteristicas = new HashSet<>();

}
