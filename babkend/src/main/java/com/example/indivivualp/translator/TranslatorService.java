package com.example.indivivualp.translator;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class TranslatorService {
    public String translateText(String text, String targetLanguage) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "DeepL-Auth-Key " + "c406504a-dbae-4a46-929d-cab397fbea63:fx");

            HttpEntity<String> entity = new HttpEntity<>("{\"text\":[\"" + text + "\"],\"target_lang\":\"" + targetLanguage + "\"}", headers);

            ResponseEntity<String> response = restTemplate.exchange("https://api-free.deepl.com/v2/translate", HttpMethod.POST, entity, String.class);
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}

