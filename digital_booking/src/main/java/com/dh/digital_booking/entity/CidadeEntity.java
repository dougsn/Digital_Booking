package com.dh.digital_booking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
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
@Table(name = "Cidades")
public class CidadeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres")
    @Schema(type = "string", allowableValues = {"Rio de Janeiro"})
    private String nome;
    @NotNull
    @Size(min = 3, message = "O país deve ter no mínimo 3 caracteres")
    @Schema(type = "string", allowableValues = {"Brasil"})
    private String pais;
    @NotNull
    @Schema(type = "string", allowableValues = {"Rio de Janeiro"})
    private String estado;
    @OneToMany(mappedBy = "cidade", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<ProdutoEntity> produtos = new HashSet<>();

}
