package com.example.indivivualp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.File;
import java.time.LocalDate;

@Data

@NoArgsConstructor
@Entity
@Table(name = "service")
public class ServiceRequest {
    public ServiceRequest(byte[] files, String email, String name, String phoneNumber, String serviceName, String requirement, String fileName) {
        this.files = files;
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.serviceName = serviceName;
        this.requirement = requirement;
        this.fileName = fileName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private byte[] files;
    @Column
    private String email;
    @Column
    private String name;
    @Column
    private String phoneNumber;
    @Column
    private String serviceName;
    @Column
    private String requirement;
    @Column
    private String fileName;
    @Column
    private String action;
    @Column
    private String status;
    @Column
    private LocalDate date;
    @Column
    private String role;
    @Column
    private String emailAdmin;
    @Column
    private String rejection;
    @Column
    private String notification;
}