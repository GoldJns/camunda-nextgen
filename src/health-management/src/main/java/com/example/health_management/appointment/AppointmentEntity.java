package com.example.health_management.appointment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "appointment")
@AllArgsConstructor
@Data
public class AppointmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long userID;

    @Column(name = "month")
    private String month;

    @Column(name = "day")
    private String day;

    @Column(name = "date")
    private String date;
    
    @Column(name = "time")
    private String time;

}