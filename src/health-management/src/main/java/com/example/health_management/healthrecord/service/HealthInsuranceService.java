package com.example.health_management.healthrecord.service;

import com.example.health_management.healthrecord.repository.HealthInsuranceRepository;
import org.springframework.stereotype.Component;

@Component
public class HealthInsuranceService {

    private final HealthInsuranceRepository healthInsuranceRepository;

    public HealthInsuranceService(HealthInsuranceRepository healthInsuranceRepository){
        this.healthInsuranceRepository = healthInsuranceRepository;
    }

    public Boolean insuranceExists(String insuranceName){
        return healthInsuranceRepository.existsByName(insuranceName);
    }
}
