package com.example.health_management.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@IdClass(UserGroupMembershipId.class)
@Table(name = "user_group_membership")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGroupMembershipEntity {
    
    @Id
    @Column(name = "group_id", nullable = false)
    private String groupId;

    @Id
    @Column(name = "user_id", nullable = false)
    private String userId;
}
