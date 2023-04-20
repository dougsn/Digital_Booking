package com.dh.digital_booking.entity;

import com.fasterxml.jackson.annotation.*;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "Reservas")
public class ReservaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Schema(type = "string", allowableValues = {"13:30"})
    private String hora_inicio;
    @NotNull
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy")
    @Schema(type = "string", allowableValues = {"12/03/2023"})
    private LocalDate data_inicio_reserva;
    @NotNull
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy")
    @Schema(type = "string", allowableValues = {"15/03/2023"})
    private LocalDate data_fim_reserva;

    @JsonIgnore
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="HH:mm:ss")
    private LocalDateTime created_at;

    @NotNull
    @ManyToOne()
    @Schema(type = "string", allowableValues = {"{id: 1}"})
    @JoinColumn(name = "produto_id")
    private ProdutoEntity produto;

//    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "_user_id")
    private UserEntity user;


}
