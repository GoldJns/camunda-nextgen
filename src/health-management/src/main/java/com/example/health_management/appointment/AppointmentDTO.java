package com.example.health_management.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AppointmentDTO {
    
    private Long id;

    private String month;

    private String day;

    private String date;
    
    private String time;
}
