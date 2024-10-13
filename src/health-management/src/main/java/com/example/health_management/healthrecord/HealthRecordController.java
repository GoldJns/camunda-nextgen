package com.example.health_management.healthrecord;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_management.healthrecord.model.HealthRecord;
import com.example.health_management.healthrecord.model.dto.CreateHealthRecordDTO;

@RestController
@RequestMapping("/api/health-record")

public class HealthRecordController {

    private final HealthRecordService healthRecordService;

    public HealthRecordController(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @PostMapping("/create")
    public HealthRecord createHealthRecord(@RequestBody CreateHealthRecordDTO healthRecord) {
        return healthRecordService.createHealthRecord(healthRecord.patientId(),healthRecord.insuranceDetails());
    }

}