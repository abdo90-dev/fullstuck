package com.example.indivivualp.services;

import com.example.indivivualp.model.ChatRoom;
import com.example.indivivualp.repositorys.ChatRoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomService {
@Autowired
    ChatRoomRepository chatRoomRepository;
public Optional<String> getChatRoomID(String senderEmail,String receiverEmail, boolean creatNewRoomIfNotExists){
return chatRoomRepository.findBySenderEmailAndReceiverEmail(senderEmail,receiverEmail).map(ChatRoom::getChatId)
        .or(()->
        {
            if (creatNewRoomIfNotExists){
                var chatId = creatChatRoom(senderEmail,receiverEmail);
                return Optional.of(chatId);
            }
            return Optional.empty();
        });
}

    private String creatChatRoom(String senderEmail, String receiverEmail) {
    var chatId = senderEmail + "_" + receiverEmail;
    ChatRoom sr = ChatRoom.builder()
            .chatId(chatId)
            .receiverEmail(receiverEmail)
            .senderEmail(senderEmail)
            .build();
        ChatRoom rs = ChatRoom.builder()
                .chatId(chatId)
                .receiverEmail(senderEmail)
                .senderEmail(receiverEmail)
                .build();
        chatRoomRepository.save(sr);
        chatRoomRepository.save(rs);
        return chatId;
    }
}
