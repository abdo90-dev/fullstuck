package com.example.indivivualp.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chats",indexes = {
        @Index(name = "idx_sender_id", columnList = "sender_id"),
        @Index(name = "idx_receiver_id", columnList = "receiver_id"),
        @Index(name = "idx_timestamp", columnList = "timestamp")})
@Data
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "sender_id", referencedColumnName = "email")
    private UserInfo sender;

    @ManyToOne()
    @JoinColumn(name = "receiver_id", referencedColumnName = "email")
    private UserInfo receiver;
    @Column(name = "chat_roomId")
    private String chatRoomId;
    @Column(name = "content")
    private String content;
    @Column(name = "timestamp")
    private LocalDateTime timestamp;
}



