package com.example.indivivualp.controllers;

import com.example.indivivualp.model.ChatMessage;
import com.example.indivivualp.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4201","http://localhost:4202"})
public class WebSocketChatController {
    @Autowired
    private ChatService chatService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void send(@Payload ChatMessage chatMessage) {

        chatService.saveChat(chatMessage);

        messagingTemplate.convertAndSendToUser(chatMessage.getReceiver(), "/queue/messages", chatMessage);
        System.out.println(chatMessage.getReceiver());
    }


}