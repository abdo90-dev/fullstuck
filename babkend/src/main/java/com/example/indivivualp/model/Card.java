package com.example.indivivualp.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Card")
public class Card {    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private long id;
    @Column
    private byte[] imageUrl;
    @Column
    private String title;
    @Column
    private String text;
    @Column
    private String section;

}
