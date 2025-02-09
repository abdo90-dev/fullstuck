package com.example.indivivualp.controllers;

import com.example.indivivualp.model.Chat;
import com.example.indivivualp.model.ChatMessage;
import com.example.indivivualp.model.UserInfo;
import com.example.indivivualp.services.ChatService;
import com.example.indivivualp.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/reds")
@CrossOrigin(origins = {"http://localhost:4201","http://localhost:4202"})
public class ChatController {
    @Autowired
    private ChatService chatService;
    @GetMapping("chatMessages/{senderEmail}/{receiverEmail}")
    public List<ChatMessage> getChatMessages(@PathVariable("senderEmail") String senderEmail,@PathVariable("receiverEmail") String receiverEmail){
        List<ChatMessage> chatMessages = chatService.getConversation(senderEmail,receiverEmail);
        System.out.println(chatMessages);
        return chatMessages;
    }
}
