package com.dh.digital_booking.entity;


import com.fasterxml.jackson.annotation.*;
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
@Table(name = "Produtos")
public class ProdutoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres")
    @Schema(type = "string", allowableValues = {"Hotel Paraiso"})
    private String nome;
    @NotNull
    @Column(columnDefinition = "longtext")
    @Size(min = 3, message = "A descrição deve ter no mínimo 3 caracteres")
    @Schema(type = "string", allowableValues = {"O melhor da região"})
    private String descricao;
    @NotNull
    @Column(columnDefinition = "longtext")
    @Schema(type = "string", allowableValues = {"Entrada após às 10:00 horas"})
    private String regras_da_casa;
    @NotNull
    @Column(columnDefinition = "longtext")
    @Schema(type = "string", allowableValues = {"Comprovante de COVID-19 obrigatório"})
    private String saude_e_seguranca;
    @NotNull
    @Column(columnDefinition = "longtext")
    @Schema(type = "string", allowableValues = {"Você não vai querer cancelar esse paraiso"})
    private String politica_de_cancelamento;
    @NotNull
    @Schema(type = "string", allowableValues = {"Avenida ..."})
    private String endereco;

    @Schema(type = "string", allowableValues = {"https://urlImagem"})
    private String imagem_default;

    @OneToMany()
    @JoinColumn(name = "produto_id")
    @Schema(type = "string", allowableValues = {"[{id: 1}]"})
    private Set<ImagemEntity> imagens = new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "produto_id")
    private Set<ClassificacaoEntity> classificacoes = new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name="produto_id")
    private Set<FavoritoEntity> favoritos = new HashSet<>();

    @JsonIgnore
    @OneToMany()
    @JoinColumn(name = "produto_id")
    private Set<ReservaEntity> reservas = new HashSet<>();
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "_user_id")
    @Schema(type = "string", allowableValues = {"{id: 1}"})
    private UserEntity user;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id")
    @Schema(type = "string", allowableValues = {"{id: 1}"})
    private CategoriaEntity categoria;
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cidade_id")
    @Schema(type = "string", allowableValues = {"{id: 1}"})
    private CidadeEntity cidade;
    @NotNull
    @ManyToMany
    @JoinTable(name = "produtos_caracteristicas",
               joinColumns = @JoinColumn(name = "produto_fk"),
               inverseJoinColumns = @JoinColumn(name = "caracteristica_fk"))
    @Schema(type = "string", allowableValues = {"[{id: 1}]"})
    private Set<CaracteristicaEntity> caracteristicas = new HashSet<>();




    public Integer getMediaClassificacao() {
        Integer media = 0;

        if(classificacoes.size() < 1) {
            return media = 0;
        }

        for (ClassificacaoEntity x : classificacoes) {
            media += x.getPontuacao();
        }
        return media/classificacoes.size();
    }
}
