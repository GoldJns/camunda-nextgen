package com.example.health_management.healthrecord;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.health_management.healthrecord.model.HealthRecord;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {


}