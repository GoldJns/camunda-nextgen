package com.example.health_management.appointment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Long>{
    
    public AppointmentEntity findAppointmentByID(long id);

    public List<AppointmentEntity> findAppointmentByUserID(long id);
}
