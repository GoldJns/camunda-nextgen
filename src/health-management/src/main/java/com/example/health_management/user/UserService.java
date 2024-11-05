package com.example.health_management.user;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.ws.rs.core.Response;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;


@Service
public class UserService {

    private final Keycloak keycloak;

    public UserService(Keycloak keycloak) {
        this.keycloak = keycloak;
    }

    public ResponseEntity<String> registerUser(UserDto userDto) {
        UsersResource usersResource = keycloak.realm("camunda-platform").users();

        UserRepresentation user = new UserRepresentation();
        user.setUsername(userDto.getEmail());
        user.setEnabled(true);
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstname());
        user.setLastName(userDto.getLastname());
        // Set custom attributes
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("age", Collections.singletonList(String.valueOf(userDto.getAge())));
        attributes.put("role", Collections.singletonList(userDto.getRole()));
        user.setAttributes(attributes);

        Response response = usersResource.create(user);
        if (response.getStatus() != 201) {
            return ResponseEntity.status(response.getStatus()).body("Failed to create user");
        }

        String userId = CreatedResponseUtil.getCreatedId(response);
        CredentialRepresentation passwordCred = new CredentialRepresentation();
        passwordCred.setType(CredentialRepresentation.PASSWORD);
        passwordCred.setValue(userDto.getPassword());
        passwordCred.setTemporary(false);
        usersResource.get(userId).resetPassword(passwordCred);

        return ResponseEntity.ok("User registered successfully");
    }

    public ResponseEntity<?> loginUser(UserDto loginDto) {
        return null;
    }

/*
    @Autowired
    UserRepository userRepository;

    private List<User> list = new ArrayList<>(); 

    public Optional<User> getUserById(int id){
        return userRepository.findById(id);
    }
    
    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public UserService(){
        list.add(new User("mail", "pass", "doc"));
    }
    public List<User> getUser(){
        return this.list;
    }

 */
}
