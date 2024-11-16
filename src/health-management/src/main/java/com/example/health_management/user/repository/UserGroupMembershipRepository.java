package com.example.health_management.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.health_management.user.model.UserGroupMembershipEntity;

import java.util.List;

public interface UserGroupMembershipRepository extends JpaRepository<UserGroupMembershipEntity, String> {

    List<UserGroupMembershipEntity> findByGroupId(String groupId);
    
}
