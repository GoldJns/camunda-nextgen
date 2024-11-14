package com.example.health_management.healthrecord.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.health_management.healthrecord.model.HealthRecordEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthRecordRepository extends JpaRepository<HealthRecordEntity, Long>{

    List<HealthRecordEntity> findByUsername(String username);

}