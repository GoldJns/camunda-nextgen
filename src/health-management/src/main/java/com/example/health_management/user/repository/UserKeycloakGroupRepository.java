package com.example.health_management.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.health_management.user.model.UserKeycloakGroupEntity;

@Repository
public interface UserKeycloakGroupRepository extends JpaRepository<UserKeycloakGroupEntity, String> {

    UserKeycloakGroupEntity findByName(String name);

}
