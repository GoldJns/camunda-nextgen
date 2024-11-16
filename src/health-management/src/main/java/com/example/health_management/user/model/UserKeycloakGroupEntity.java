package com.example.health_management.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "keycloak_group")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserKeycloakGroupEntity {

    @Id
    @Column(name = "id", length = 36, nullable = false)
    private String id;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "parent_group", length = 255)
    private String parentGroup;

    @Column(name = "realm_id", length = 255)
    private String realmId;
}
