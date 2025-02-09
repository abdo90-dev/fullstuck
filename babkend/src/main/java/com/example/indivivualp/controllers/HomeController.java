package com.example.indivivualp.controllers;
import com.example.indivivualp.model.Card;
import com.example.indivivualp.model.UserInfo;
import com.example.indivivualp.services.CardService;
import com.example.indivivualp.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/home")

@CrossOrigin(origins = "http://localhost:4200")
public class HomeController{
    public Map<String,UserInfo> user = new HashMap<>();
    @Autowired
    private CardService homePageService;
    @Autowired
    private UserServices userServices;
    @GetMapping("/news")
    @CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
    public ResponseEntity<List<Card>> getNews() {
        List<Card> cards = homePageService.getAll("news");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(cards, headers, HttpStatus.OK);
    }
    @GetMapping("/login")
    @CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
    public  UserInfo login(@RequestParam("email") String email){
        UserInfo userInfo=userServices.getUserByEmail(email);
        user.put(userInfo.getRole(),userInfo);

        return user.get(userInfo.getRole());
    }
    @GetMapping("/user")
    @CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
    public UserInfo getUser(@RequestParam("role") String role){
       return user.get(role);
    }
    @GetMapping("/achievement")
    @CrossOrigin(origins = {"http://localhost:4202","http://localhost:4201"})
    public List<Card> getAchievements(){


        return homePageService.getAll("achievement");
    }
    @PostMapping("/save")
    @CrossOrigin(origins = "http://localhost:4201")
    public ResponseEntity saveCard(
            @RequestParam("image_url") MultipartFile file,
            @RequestParam("text") String text,
            @RequestParam("section") String section,
            @RequestParam("serviceName") String title
    ) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Image file is required.");
        }
        try {
            byte[] imageData = file.getBytes();

            Card card = new Card();
            card.setTitle(title);
            card.setImageUrl(imageData);
            card.setText(text);
            card.setSection(section);

            homePageService.saveCard(card);

            return ResponseEntity.ok(card);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving card: " + e.getMessage());
        }
    }
    @DeleteMapping("/delete/{title}")
    @CrossOrigin(origins = "http://localhost:4201")
    @Transactional
    public ResponseEntity<String> deleteCard(@PathVariable String title) {
        try {

                homePageService.deleteByName(title);
                return ResponseEntity.ok("Card deleted successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PutMapping("/update")
    @CrossOrigin(origins = "http://localhost:4201")
    public ResponseEntity editCard(@RequestParam("id") long id,@RequestParam("section") String section,@RequestParam("descrition") String descrition,@RequestParam("title") String title,@RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            Card card = homePageService.getById(id);
            card.setText(descrition);
            if (file != null && !file.isEmpty())
            card.setImageUrl(file.getBytes());
            card.setTitle(title);
            card.setSection(section);
            Card cardResponse = homePageService.saveCard(card);
            return ResponseEntity.ok(cardResponse);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
