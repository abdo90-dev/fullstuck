package com.example.indivivualp.services;

import com.example.indivivualp.model.Chat;
import com.example.indivivualp.model.ChatMessage;
import com.example.indivivualp.model.UserInfo;
import com.example.indivivualp.repositorys.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;


@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private ChatRoomService chatRoomRepository;
    @Autowired
    UserServices userServices;
    public Chat saveChat(ChatMessage chatMessage){
        String chatId = chatRoomRepository.getChatRoomID(chatMessage.getSender(),chatMessage.getReceiver(),true).get();
        Chat chatEntity = new Chat();

        chatEntity.setSender(userServices.getUserByEmail(chatMessage.getSender()));
        chatEntity.setReceiver(userServices.getUserByEmail(chatMessage.getReceiver()));
        chatEntity.setContent(chatMessage.getContent());
        Instant instant = Instant.parse(chatMessage.getTimestamp());
        LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);

        chatEntity.setTimestamp(dateTime);
        chatEntity.setChatRoomId(chatId);
        chatRepository.save(chatEntity);


        return chatEntity;

    }
    public List<ChatMessage> getConversation(String sender, String receiver) {
        var chatId = chatRoomRepository.getChatRoomID(sender,receiver,false);
        List<Chat> chat = chatRepository.findChatByChatRoomId(chatId.get());
        List<ChatMessage> chatMessages = new ArrayList<>();

        for(Chat chat1: chat){
        chatMessages.add(ChatMessage.builder().content(chat1.getContent())
                        .receiver(chat1.getReceiver().getEmail())
                        .sender(chat1.getSender().getEmail())
                        .timestamp(chat1.getTimestamp().toString())
                .build());
        }
        return chatMessages;
    }
    public void deleteChatByEmail(String emailSender){
        chatRepository.deleteChatsBySenderEmailOrReceiverEmail(emailSender);
    }
}
