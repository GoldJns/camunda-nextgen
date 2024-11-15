package com.example.health_management.appointment;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Long>{
    
    Optional<AppointmentEntity> findById(Long id);

    List<AppointmentEntity> findByUserID(String userID);
}
