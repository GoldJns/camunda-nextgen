package com.example.health_management.healthrecord.model.dto;

import java.util.List;

public record HealthRecordDTO(
        Long id,
        String userId,
        String username,
        List<String> allergies,
        List<String> medicalHistory,
        List<String> diagnoses,
        List<String> medicines,
        String healthInsurance
) {}