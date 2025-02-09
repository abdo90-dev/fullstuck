package com.example.indivivualp.services;

import com.example.indivivualp.model.Card;
import com.example.indivivualp.repositorys.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class CardService {
    @Autowired
    CardRepository repository;
    public List<Card> getAll(String sectionName){
        List<Card> cards = repository.findAllBySection(sectionName);
        return cards;
    }
    public Card getById(Long id){
        return repository.findById(id).get();
    }
    public Card saveCard(Card card){

        return repository.save(card);

    }

    public void deleteByName(String title) {
     repository.deleteByTitle(title);
    }
}
