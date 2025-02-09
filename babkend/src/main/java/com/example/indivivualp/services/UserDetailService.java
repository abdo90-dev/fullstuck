package com.example.indivivualp.services;

import com.example.indivivualp.model.UserInfo;
import com.example.indivivualp.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserInfo userInfo = userRepository.findByEmail(email);
        UsersDetails usersDetails = null;
        if (userInfo != null){
       usersDetails = new UsersDetails(userInfo);


        }else{
            throw new UsernameNotFoundException("user not exit with name :" + email);

        }
        return usersDetails;
    }
}
