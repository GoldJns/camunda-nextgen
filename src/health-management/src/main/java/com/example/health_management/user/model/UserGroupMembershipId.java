package com.example.health_management.user.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGroupMembershipId implements Serializable {
    private Long userId;
    private Long groupId;

}
