package com.example.health_management.appointment;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "appointment")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AppointmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private String userID;

    @Column(name = "doc_name")
    private String docName;

    @Column(name = "month")
    private String month;

    @Column(name = "day")
    private String day;

    @Column(name = "date")
    private LocalDate date;
    
    @Column(name = "time")
    private LocalTime time;

}
