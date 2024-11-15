package com.example.health_management.appointment;

import java.util.List;

import com.example.health_management.appointment.AppointmentEntity;
import com.example.health_management.appointment.AppointmentService;
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

    @PostMapping("/create/{username}")
    public ResponseEntity<Long> createAppointment(@PathVariable String username) {

        Long processInstanceId = appointmentService.startCreateAppointmentProcess(username);
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
