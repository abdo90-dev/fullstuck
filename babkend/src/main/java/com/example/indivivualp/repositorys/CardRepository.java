package com.example.indivivualp.repositorys;

import com.example.indivivualp.model.Card;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends CrudRepository<Card,Long> {
    List<Card> findAllBySection(String sectionName);
    @Override
     Card save(Card entity);

    @Override
    Optional<Card> findById(Long s);

    void deleteByTitle(String title);

}
