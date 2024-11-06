package com.example.health_management.appointment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appoint")
public class appointmentController {
    
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentEntity appointment) {
        AppointmentEntity apponit = appointmentService.saveOrUpdate(appointment);
        return new ResponseEntity<>(apponit, HttpStatus.CREATED);
    }

    @GetMapping("/edit/{userID}")
    public List<AppointmentEntity> getAppointmentByUserID(@PathVariable("userID") long userID) {
        return appointmentService.getAppointmentByUserID(userID);
    }
}
