package com.example.health_management.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.health_management.user.model.UserGroupMembershipEntity;
import com.example.health_management.user.model.UserGroupMembershipId;

import java.util.List;

public interface UserGroupMembershipRepository extends JpaRepository<UserGroupMembershipEntity, UserGroupMembershipId> {

    List<UserGroupMembershipEntity> findByGroupId(String groupId);
    
}
