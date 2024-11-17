package com.example.health_management.appointment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appoint")
public class AppointmentController {
    
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/create/{userID}")
    public ResponseEntity<Long> createHealthRecord(@PathVariable String userID) {

        Long processInstanceId = appointmentService.startCreateAppointmentProcess(userID);
        if (processInstanceId == null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(null);
        }
        return ResponseEntity.ok(processInstanceId);
    }

    @GetMapping("/edit/{userID}")
    public List<AppointmentEntity> getByUserID(@PathVariable("userID") String userID) {
        return appointmentService.getByUserID(userID);
    }
}
