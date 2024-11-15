package com.example.health_management.healthrecord.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "health_insurances")
public class HealthInsuranceEntity {

    @Id
    private String name;

    public HealthInsuranceEntity() {
    }

    public HealthInsuranceEntity(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
