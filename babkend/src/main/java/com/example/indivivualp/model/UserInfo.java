package com.example.indivivualp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class UserInfo {

    @Column(name = "first_name")
    String first ;
    @Column(name = "last_name")
    String last;
    @Id
    @Column
    String email ;

    public UserInfo(String first, String last, String email, String password, String phone_number, String country) {
        this.first = first;
        this.last = last;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.country = country;
        this.role = role;
    }

    @Column
    String password ;
    @Column
    String phone_number;
    @Column
    String country;
    @Column
    private String role ;
    @Column
    private String description;
    @Column
    private byte[] profile_image;

}
