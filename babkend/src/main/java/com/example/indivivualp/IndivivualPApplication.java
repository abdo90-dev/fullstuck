package com.example.indivivualp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})

public class IndivivualPApplication{
    public static void main(String[] args) {
        SpringApplication.run(IndivivualPApplication.class, args);

    }

}
