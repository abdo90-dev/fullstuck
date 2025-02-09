package com.example.indivivualp.controllers;
import com.example.indivivualp.model.UserInfo;
import com.example.indivivualp.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/signup")
public class UserInfoController {
    @Autowired
    private UserServices userServices;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")

    @CrossOrigin(origins = {"http://localhost:4200","http://localhost:4201","http://localhost:4202"})
    public UserInfo getUserInfo(@RequestParam(value = "op", required = false) String op,@RequestParam("firstname") String firstname,@RequestParam("lastname") String lastname ,@RequestParam("email") String email,@RequestParam("password") String password,@RequestParam("phonenumber") String phonenumber,@RequestParam("country") String country,@RequestParam("role") String role,@RequestParam(value = "profileimage", required = false) MultipartFile profileimage) throws IOException{
        UserInfo   user;

        if(op != null && op.equals("update")){
        user = userServices.getUserByEmail(email);
            user.setFirst(firstname);
            user.setLast(lastname);
            user.setEmail(email);
            user.setPhone_number(phonenumber);
            user.setRole(role);
            user.setCountry(country);
            if(password != null&&!password.equals(""))
            user.setPassword(password);
        }else {
            user = new UserInfo();

            user.setFirst(firstname);
            user.setLast(lastname);
            user.setEmail(email);
            user.setPhone_number(phonenumber);
            user.setRole(role);
            user.setCountry(country);
            if (profileimage != null) {
                try {
                    user.setProfile_image(profileimage.getBytes());
                } catch (Exception e) {
                }

            }
            if (password != "" || password != null) {
                String encryptpwd = passwordEncoder.encode(password);
                user.setPassword(encryptpwd);
            }
        }
        return userServices.save(user);

    }


    @GetMapping("/users")
    @CrossOrigin(origins={"http://localhost:4200","http://localhost:4201","http://localhost:4202"})
    public List<UserInfo> getAllUsersByRule(@RequestParam("role") String userRole){

        return userServices.getAllUserByRole(userRole);
    }

}
