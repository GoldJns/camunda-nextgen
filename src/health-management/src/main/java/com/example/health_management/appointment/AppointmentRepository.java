package com.example.health_management.appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Long>{
    
    Optional<AppointmentEntity> findById(Long id);

    List<AppointmentEntity> findByUserID(String userID);

    List<AppointmentEntity> findAll();

    AppointmentEntity findByMonthAndDayAndDateAndTime(String month, String day, LocalDate date, LocalTime time);
}
