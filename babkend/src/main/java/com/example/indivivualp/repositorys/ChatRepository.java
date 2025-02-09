package com.example.indivivualp.repositorys;

import com.example.indivivualp.model.Chat;
import com.example.indivivualp.model.ChatRoom;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
@Repository
public interface ChatRepository extends CrudRepository<Chat,Long> {

    Chat save(Chat chat);
    List<Chat> findChatByChatRoomId(String chatRoomId);
    @Query("SELECT c FROM Chat c WHERE c.sender.email = :email OR c.receiver.email = :email")
    List<Chat> findChatsBySenderEmailOrReceiverEmail(String email);

    // Manually delete chat messages
    default void deleteChatsBySenderEmailOrReceiverEmail(String email) {
        List<Chat> chatsToDelete = findChatsBySenderEmailOrReceiverEmail(email);
        deleteAll(chatsToDelete);
    }
}
