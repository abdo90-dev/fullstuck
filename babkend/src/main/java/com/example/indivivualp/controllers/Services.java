package com.example.indivivualp.controllers;

import com.example.indivivualp.model.Card;
import com.example.indivivualp.model.ServiceRequest;
import com.example.indivivualp.model.UserInfo;
import com.example.indivivualp.services.CardService;
import com.example.indivivualp.services.Sservice;
import com.example.indivivualp.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/service")
@CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
public class Services {

    @Autowired
    private CardService cardService;
    @Autowired
    private UserServices userService;
    @Autowired
    private Sservice service;

    @GetMapping("/servicesResponse")
    @CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
    public List<ServiceRequest> getServicesResponse( @RequestParam("email_client") String email,@RequestParam("role") String role) {

        return service.getServicesResponse(email,role);
    }
    @GetMapping("/notations")
    @CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
    public List<ServiceRequest> getNotations() {

               return service.getNotifications("response");
    }
    @GetMapping("/AdminNotifications")
    @CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
    public List<ServiceRequest> getAdminNotifications( ) {

        return service.getAdminNotifications();
    }
    @DeleteMapping("/removeNotification")
    @CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
    public void removeNotification(@RequestParam("notification") Long serviceRequest){
        service.removeNotification(serviceRequest);
    }
    @GetMapping("/services")
    @CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
    public List<Card> getServices() {
        return cardService.getAll("service");
    }
    @PostMapping("/serviceRequest")
    @CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
    public void saveRequest(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam(value = "client_mail", required = false) String client_mail,
            @RequestParam("phone_number") String phone_number,
            @RequestParam("serviceName") String serviceName,
            @RequestParam("requirement") String requirement,
            @RequestParam("action") String action,
            @RequestParam("role") String role,
            @RequestParam("status") String status,
            @RequestParam(value = "notification", required = false) String notification
    ) {
        try {
            ServiceRequest serviceRequest = new ServiceRequest(file.getBytes(), email, name, phone_number, serviceName, requirement, file.getOriginalFilename());
            serviceRequest.setAction(action);
            serviceRequest.setDate(LocalDate.now());
            serviceRequest.setRole(role);
            serviceRequest.setStatus(status);
            serviceRequest.setNotification(notification);
            if (client_mail != null)
            serviceRequest.setEmailAdmin(client_mail);
            service.save(serviceRequest);
        } catch (IOException e) {

        }
    }
    @PutMapping("/update")
    @CrossOrigin(origins = {"http://localhost:4201","http://localhost:4202"})
    public ResponseEntity<String> editCard(@RequestParam("id") String id,@RequestParam("status") String status,@RequestParam("email") String email) {

        try {

            Optional<ServiceRequest> card = service.getServiceById(Long.valueOf(id));
            UserInfo user = userService.getUserByEmail(email);
                card.get().setStatus(status);
            card.get().setEmailAdmin(email);
                if(status.equals("rejected") ){

                    card.get().setNotification("the request has been rejected by"+ user.getFirst()+" "+ user.getLast());
                    if(user.getRole().equals("ADMIN")){
                     card.get().setAction("response");
                    }

                }else if(status.equals("finished")){
                    card.get().setNotification("the request has been finished by"+ user.getFirst()+" "+ user.getLast());
                    card.get().setAction("response");
                }else{
                    card.get().setNotification("the request has been accepted by"+ user.getFirst()+" "+ user.getLast());
                    card.get().setAction("response");
                }

            service.save(card.get());
            return ResponseEntity.ok("Card deleted successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/getServicesRequist")
    @CrossOrigin(origins = {"http://localhost:4202", "http://localhost:4201"})
    public List<ServiceRequest> getUserInfo(
            @RequestParam(value = "email", required = false) String email,
            @RequestParam("role") String role) {
        List<ServiceRequest> serviceRequest;
        if (email != null)
        serviceRequest = service.getServiceByEmail(email,role);
        else
            serviceRequest = service.getAllServicesByrole(role);
        return serviceRequest;
    }
}
