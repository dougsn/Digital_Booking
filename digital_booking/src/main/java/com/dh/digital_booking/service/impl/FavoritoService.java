package com.dh.digital_booking.service.impl;

import com.dh.digital_booking.entity.FavoritoEntity;
import com.dh.digital_booking.entity.ProdutoEntity;
import com.dh.digital_booking.entity.UserEntity;
import com.dh.digital_booking.repository.IFavoritoRepository;
import com.dh.digital_booking.repository.IProdutoRepository;
import com.dh.digital_booking.repository.IUserRepository;
import com.dh.digital_booking.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FavoritoService implements IHotelService<FavoritoEntity> {
    @Autowired
    private IFavoritoRepository favoritoRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IProdutoRepository produtoRepository;

    @Override
    public List<FavoritoEntity> findAll() {
        return favoritoRepository.findAll();
    }

    @Override
    public ResponseEntity<Optional<FavoritoEntity>> findById(Long id) {
        Optional<FavoritoEntity> favorito;
        favorito = favoritoRepository.findById(id);
        if (favorito.isPresent()){
            return new ResponseEntity<>(favorito, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public FavoritoEntity adicionar(FavoritoEntity favoritoEntity) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String id = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(id).get();
        Long productId = favoritoEntity.getProduto().getId();
        ProdutoEntity produto = produtoRepository.findById(productId).get();

        favoritoEntity.setUser(userEntity);
        favoritoEntity.setProduto(produto);
        if (favoritoEntity != null) {
            return favoritoRepository.save(favoritoEntity);
        }
        return new FavoritoEntity();
    }

    @Override
    public ResponseEntity<String> deletar(Long id) {
        if(favoritoRepository.findById(id).isPresent()){
            favoritoRepository.deleteById(id);
            return ResponseEntity.ok().body("Favorito apagado!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorito não encontrado!");
    }

    @Override
    public FavoritoEntity atualizar(Long id, FavoritoEntity favoritoEntity) {
        if(favoritoEntity != null && favoritoRepository.findById(favoritoEntity.getId()).isPresent()) {
            FavoritoEntity existingFav = favoritoRepository.findById(id).get();

            Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
            String idUser = (String) principal;
            UserEntity userEntity = userRepository.findByEmail(idUser).get();

            existingFav.setUser(userEntity);
            Long productId = favoritoEntity.getProduto().getId();
            ProdutoEntity produto = produtoRepository.findById(productId).get();

            existingFav.setProduto(produto);
            return favoritoRepository.save(favoritoEntity);
        }
        return new FavoritoEntity();
    }

    public ResponseEntity<String> deletarFavorito(FavoritoEntity favoritoEntity) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String id = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(id).get();

        Set<FavoritoEntity> favoritos = userEntity.getFavoritos(); // Lista de favoritos do usuário autenticado

        Long productId = favoritoEntity.getProduto().getId(); // Pegando o ID do produto que foi enviado
        ProdutoEntity produtoEnviado = produtoRepository.findById(productId).get(); // Pegando o produto.

        Set<FavoritoEntity> favoritosDoProduto = produtoEnviado.getFavoritos(); // Pegando a lista de favorito do produto
        for (FavoritoEntity fav : favoritosDoProduto) { // Loop no favorito do produto
            for (FavoritoEntity favUser : favoritos) { // Loop no favorito do usuário logado
                if (fav.getId() == favUser.getId()) { // Comparando os 2 ID's para a exclusão
                    favoritoRepository.deleteById(favUser.getId()); // Se for igual, exclui o favorito do usuário.
                    return ResponseEntity.ok().body("Favorito apagado!");
               }
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorito não encontrado!");
    }

    public boolean isFavorito(Long id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(idUser).get(); // Usuário logado

        Set<FavoritoEntity> favoritos = userEntity.getFavoritos(); // Salvando os ID's dos favoritos do usuário em uma lista

        ProdutoEntity produtoSelecionado = produtoRepository.findById(id).get(); // Produto que será validado, se esta favoritado ou não.

        Set<FavoritoEntity> favoritosDoProduto = produtoSelecionado.getFavoritos(); // Pegando todos os favoritos do produto selecionado
        for (FavoritoEntity fav : favoritosDoProduto){
            for (FavoritoEntity favUser : favoritos) {
                if (Objects.equals(fav.getId(), favUser.getId())){
                    return true;
                }
            }
        }
        return false;
    }

    public List<ProdutoEntity> ProdutoFavoritoUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        UserEntity userEntity = userRepository.findByEmail(idUser).get();

        Set<FavoritoEntity> favoritos = userEntity.getFavoritos(); // Salvando os ID's dos favoritos em uma lista
        List<ProdutoEntity> prodFav = new ArrayList<>();
        for (FavoritoEntity fav : favoritos) {
            if (fav.getUser().getId() == userEntity.getId()) {
                prodFav.add(fav.getProduto());
            }
        }
        return prodFav;
    }
}