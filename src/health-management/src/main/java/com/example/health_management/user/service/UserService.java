package com.example.health_management.user.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.health_management.user.model.UserEntity;
import com.example.health_management.user.model.UserGroupMembershipEntity;
import com.example.health_management.user.model.UserKeycloakGroupEntity;
import com.example.health_management.user.repository.UserGroupMembershipRepository;
import com.example.health_management.user.repository.UserKeycloakGroupRepository;
import com.example.health_management.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private UserKeycloakGroupRepository userKeycloakGroupRepository;

    private UserGroupMembershipRepository userGroupMembershipRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity findUser(String username){
        return userRepository.findByUsername(username);
    }

    public UserEntity findUs(String username){
        return userRepository.findByUsername(username);
    }

    public List<String> findDoc(String role) {

        UserKeycloakGroupEntity keycloakGroup = userKeycloakGroupRepository.findByName(role);

        List<UserGroupMembershipEntity> allUserswithroleName = userGroupMembershipRepository.findByGroupId(keycloakGroup.getId());
        List<String> allUsersNames = new ArrayList<>();

        for(var membership:allUserswithroleName){
            String userId = membership.getUserId();
            Optional<UserEntity> user = userRepository.findById(userId);
            if (user.isPresent()) {
                // Step 4.3: Add the username to the list
                UserEntity userEntity = user.get();
                allUsersNames.add(userEntity.getUsername());
            }
        }

        return allUsersNames;
    }
}
