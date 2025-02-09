package com.example.indivivualp.services;

import com.example.indivivualp.model.UserInfo;
import com.example.indivivualp.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServices {
    @Autowired
    UserRepository userRepository;
    public UserInfo save(UserInfo userInfo){
        return userRepository.save(userInfo);

    }
    public UserInfo getUserByEmail(String email){
        return userRepository.findByEmail(email);

    }
    public void deleteUser(UserInfo user){
       userRepository.delete(user);

    }
    public List<UserInfo> getAllUserByRole(String role){
        return userRepository.findAllByRole(role);

    }
}
