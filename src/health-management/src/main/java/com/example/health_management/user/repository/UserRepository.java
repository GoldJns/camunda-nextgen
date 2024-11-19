package com.example.health_management.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.health_management.user.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {

    UserEntity findByUsername(String username);

}