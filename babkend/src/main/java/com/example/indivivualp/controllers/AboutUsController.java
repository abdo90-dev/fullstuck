package com.example.indivivualp.controllers;

import com.example.indivivualp.model.Card;
import com.example.indivivualp.model.UserInfo;
import com.example.indivivualp.repositorys.UserRepository;
import com.example.indivivualp.services.CardService;
import com.example.indivivualp.services.ChatService;
import com.example.indivivualp.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/aboutUs")
@CrossOrigin(origins = "http://localhost:4202")
public class AboutUsController {

    @Autowired
    UserServices user;
    @Autowired
    UserServices teamMembers;
    @Autowired
    CardService definition;
    @Autowired
    ChatService chatService;


    @GetMapping("/members")
    @CrossOrigin(origins = {"http://localhost:4202","http://localhost:4201"})
    public List<UserInfo> getMembers(@RequestParam("role") String userRole){
        System.out.println("done");
        List<UserInfo> user = teamMembers.getAllUserByRole(userRole);
         return user;

    }
    @PutMapping("/upgrade")
    @CrossOrigin(origins =  {"http://localhost:4202","http://localhost:4201"})
    public List<UserInfo> upgradeUser(@RequestParam("email") String email){
        UserInfo user = this.user.getUserByEmail(email);
        user.setRole("ADMIN");
        this.user.save(user);
        return teamMembers.getAllUserByRole("USER");
    }
    @GetMapping("/definition")
    @CrossOrigin(origins =  {"http://localhost:4202","http://localhost:4201"})
    public Card getDefinition(){
        Card card = definition.getAll("about").get(0);
        return card;
    }
    @DeleteMapping("/delete")
    @CrossOrigin(origins =  {"http://localhost:4202","http://localhost:4201"})
    public void deleteUser(@RequestParam("email") String email){
UserInfo userInfo = user.getUserByEmail(email);
        chatService.deleteChatByEmail(email);
        user.deleteUser(userInfo);
    }


}
