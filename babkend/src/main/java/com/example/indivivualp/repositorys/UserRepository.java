package com.example.indivivualp.repositorys;

import com.example.indivivualp.model.UserInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<UserInfo,String> {
    @Override
    UserInfo save(UserInfo entity);
    UserInfo findByEmail(String email);

    @Override
    void deleteById(String s);

    List<UserInfo> findAllByRole(String role);

}
