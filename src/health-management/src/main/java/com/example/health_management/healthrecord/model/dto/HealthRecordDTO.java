package com.example.health_management.healthrecord.model.dto;

public record HealthRecordDTO(
        Long id,
        String userId,
        String username,
        String allergies,
        String chronicConditions,
        String surgeries,
        String healthInsurance
) {}