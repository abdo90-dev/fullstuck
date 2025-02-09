package com.example.indivivualp.translator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/translator")
@CrossOrigin(origins =  {"http://localhost:4202","http://localhost:4201"})
public class TranslatorControler {
    @Autowired
    private TranslatorService translationService;

    @PostMapping("/translate")
    public String translate(@RequestParam("content") String text, @RequestParam("tergaetLang") String targetLanguage) {
        return translationService.translateText(text, targetLanguage);
    }
}
