package com.dh.digital_booking.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.Parameter;
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
@Table(name = "Categorias")
@JsonIgnoreProperties(ignoreUnknown = true)
public class CategoriaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Size(min = 3, message = "A qualificação deve ter no mínimo 3 caracteres")
    @Schema(type = "string", allowableValues = {"Hotel"})
    private String qualificacao;
    @NotNull
    @Size(min = 3, message = "A descrição deve ter no mínimo 3 caracteres")
    @Schema(type = "string", allowableValues = {"Hotel ...."})
    private String descricao;
    @NotNull
    @Schema(type = "string", allowableValues = {"https://urlimagem..."})
    private String urlImagem;

    @OneToMany(mappedBy = "categoria", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<ProdutoEntity> produtos = new HashSet<>();

}
