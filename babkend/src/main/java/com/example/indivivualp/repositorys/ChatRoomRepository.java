package com.example.indivivualp.repositorys;

import com.example.indivivualp.model.Chat;
import com.example.indivivualp.model.ChatRoom;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ChatRoomRepository extends CrudRepository<ChatRoom,String> {

    Optional<ChatRoom> findBySenderEmailAndReceiverEmail(String senderEmail, String receiverEmail);
    void deleteBySenderEmailOrReceiverEmail(String senderEmail, String receiverEmail);
}
