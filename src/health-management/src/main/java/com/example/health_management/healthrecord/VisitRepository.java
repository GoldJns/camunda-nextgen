package com.example.health_management.healthrecord;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.health_management.healthrecord.model.Visit;

public interface VisitRepository extends JpaRepository<Visit, Long> {
    
}