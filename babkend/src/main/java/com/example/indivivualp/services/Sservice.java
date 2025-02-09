package com.example.indivivualp.services;
import com.example.indivivualp.model.ServiceRequest;
import org.springframework.stereotype.Service;
import com.example.indivivualp.repositorys.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class Sservice {
    @Autowired
    ServiceRepository repository;
    public ServiceRequest save(ServiceRequest userInfo){
        return repository.save(userInfo);

    }
    public List<ServiceRequest> getNotifications( String action){
        List<ServiceRequest> serviceRequest = repository.findAllByNotificationIsNotNullAndAction(action);
        return serviceRequest;
    }
    public List<ServiceRequest> getAdminNotifications(){
        List<ServiceRequest> serviceRequest = repository.findAllByRole("USER");
        return serviceRequest;
    }
    public void removeNotification(Long serviceRequest){
        repository.deleteById(serviceRequest);
    }
    public List<ServiceRequest> getServicesResponse( String email,String role){
        List<ServiceRequest> serviceRequest = repository.findAllByRoleAndEmailAdmin(role,email);
        return serviceRequest;
    }
    public List<ServiceRequest> getServiceByEmail( String email,String role){
        List<ServiceRequest> serviceRequest = repository.findAllByEmailAndRole(email,role);
        return serviceRequest;
    }
    public Optional<ServiceRequest> getServiceById(long id){

        return repository.findById(id);
    }
    public List<ServiceRequest> getAllServicesByrole(String role){
        return repository.findAllByRole(role);

    }
}
