package com.example.health_management.healthrecord;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.health_management.healthrecord.model.HealthRecordEntity;

public interface HealthRecordRepository extends JpaRepository<HealthRecordEntity, Long>{

    public List<HealthRecordEntity> findByUsername(String username);

}