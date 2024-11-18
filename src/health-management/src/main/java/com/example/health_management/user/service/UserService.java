package com.example.health_management.user.service;

import org.springframework.stereotype.Service;

import com.example.health_management.user.model.UserDto;
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

    public UserService(UserRepository userRepository, 
                   UserKeycloakGroupRepository userKeycloakGroupRepository, 
                   UserGroupMembershipRepository userGroupMembershipRepository) {
        this.userRepository = userRepository;
        this.userKeycloakGroupRepository = userKeycloakGroupRepository;
        this.userGroupMembershipRepository = userGroupMembershipRepository;
    }

    public UserEntity findUser(String username){
        return userRepository.findByUsername(username);
    }

    public UserEntity findUs(String username){
        return userRepository.findByUsername(username);
    }

    public List<UserDto> findDoc(String role) {

        UserKeycloakGroupEntity keycloakGroup = userKeycloakGroupRepository.findByName(role);

        List<UserGroupMembershipEntity> allUserswithroleName = userGroupMembershipRepository.findByGroupId(keycloakGroup.getId());
        List<UserDto> allUsersNames = new ArrayList<>();

        for(var membership:allUserswithroleName){
            String userId = membership.getUserId();
            Optional<UserEntity> user = userRepository.findById(userId);
            if (user.isPresent()) {
                UserEntity userEntity = user.get();
                UserDto userDto = new UserDto();
                userDto.setUsername(userEntity.getUsername());
                userDto.setFirstname(userEntity.getFirstName());
                userDto.setLastname(userEntity.getLastName());
                allUsersNames.add(userDto);
            }
        }

        return allUsersNames;
    }
}
