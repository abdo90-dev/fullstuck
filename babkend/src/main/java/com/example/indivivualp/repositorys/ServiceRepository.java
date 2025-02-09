package com.example.indivivualp.repositorys;
import com.example.indivivualp.model.ServiceRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends CrudRepository<ServiceRequest,Long>{
    @Override
    ServiceRequest save(ServiceRequest entity);

    List<ServiceRequest> findAllByEmailAndRole(String email,String role);
    List<ServiceRequest> findAllByActionAndRole(String action,String role);
    List<ServiceRequest> findAllByRoleAndEmailAdmin(String role,String email);
    List<ServiceRequest> findAllByNotificationIsNotNullAndAction(String action);
    List<ServiceRequest> findAllByRole(String role);

}
