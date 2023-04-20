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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "Imagens")
public class ImagemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Size(min = 3, message = "O título deve ter no mínimo 3 caracteres")
    @Schema(type = "string", allowableValues = {"Quarto"})
    private String titulo;
    @NotNull
    @Schema(type = "string", allowableValues = {"https://urlImagem..."})
    private String url;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "produto_id")
    private ProdutoEntity produto;

}
