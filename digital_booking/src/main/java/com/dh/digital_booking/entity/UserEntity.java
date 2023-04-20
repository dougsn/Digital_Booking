package com.dh.digital_booking.entity;

import com.fasterxml.jackson.annotation.*;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotEmpty
    @Schema(type = "string", allowableValues = {"Douglas"})
    private String firstname;
    @NotEmpty
    @Schema(type = "string", allowableValues = {"Silva"})
    private String lastname;
    @NotEmpty
    @Email(message = "Email inválido")
    @Schema(type = "string", allowableValues = {"douglas@gmail.com"})
    private String email;
    @JsonIgnore
    @NotEmpty
    @Size(min = 3, message = "A senha deve ter no mínimo 3 caracteres")
    private String password;

    @ManyToOne()
    @JoinColumn(name = "funcoes_id")
    @Schema(type = "string", allowableValues = {"{id: 1}"})
    private FuncaoEntity funcoes;

    @JsonIgnore
    @OneToMany()
    @JoinColumn(name = "_user_id")
    private Set<ClassificacaoEntity> classificacoes = new HashSet<>();


    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "_user_id")
    private Set<FavoritoEntity> favoritos = new HashSet<>();

    @JsonIgnore
    @OneToMany()
    @JoinColumn(name = "_user_id")
    private Set<ReservaEntity> reservas = new HashSet<>();

    @JsonIgnore
    @OneToMany()
    @JoinColumn(name = "_user_id")
    private Set<ProdutoEntity> produtos = new HashSet<>();

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_".concat(funcoes.getNome())));
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }
    @JsonIgnore
    @Override
    @Schema(type = "string", allowableValues = {"douglas@gmail.com"})
    public String getUsername() {
        return email;
    }
    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }
}
