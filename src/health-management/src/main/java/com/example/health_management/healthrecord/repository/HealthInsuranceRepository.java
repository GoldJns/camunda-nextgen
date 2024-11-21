package com.example.health_management.healthrecord.repository;

import com.example.health_management.healthrecord.model.HealthInsuranceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthInsuranceRepository extends JpaRepository<HealthInsuranceEntity, String> {
    Boolean existsByName(String name);
}
