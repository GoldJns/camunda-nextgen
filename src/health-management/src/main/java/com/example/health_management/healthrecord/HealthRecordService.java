package com.example.health_management.healthrecord;

import org.springframework.stereotype.Service;

import com.example.health_management.healthrecord.model.HealthRecord;

@Service
public class HealthRecordService {

    private final HealthRecordRepository healthRecordRepository;

    public HealthRecordService(HealthRecordRepository healthRecordRepository) {
        this.healthRecordRepository = healthRecordRepository;
    }

   
    public HealthRecord createHealthRecord(Long patientId, String insuranceDetails) {
        HealthRecord healthRecord = new HealthRecord(patientId,insuranceDetails);
        return healthRecordRepository.save(healthRecord);
    }
    
}