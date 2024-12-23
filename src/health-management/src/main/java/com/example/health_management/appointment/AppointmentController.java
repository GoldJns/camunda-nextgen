package com.example.health_management.appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appoint")
public class AppointmentController {
    
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/create/{username}")
    public ResponseEntity<?> createAppointment(@PathVariable String username) {
        return appointmentService.startCreateAppointmentProcess(username);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delteAppointment(@PathVariable long id) {
        return appointmentService.startDeleteAppointmentProcess(id);
    }

    @GetMapping("/byid/{userID}")
    public Optional<AppointmentEntity> getByID(@PathVariable long userID) {
        return appointmentService.getByID(userID);
    }
    @GetMapping("/byusername/{username}")
    public List<AppointmentEntity> getByUsername(@PathVariable String username) {
        return appointmentService.getByUsername(username);
    }
    @GetMapping("/byuserid/{userID}")
    public List<AppointmentEntity> getByUserID(@PathVariable String userID) {
        return appointmentService.getByUserID(userID);
    }

    @GetMapping("/findAll")
    public List<AppointmentEntity> findAll() {
        return appointmentService.findAll();
    }

    @GetMapping("/validate/")
    public boolean existsByMonthAndDayAndDateAndTime(@RequestParam("docName") String docName,
                                                    @RequestParam("date") LocalDate date, 
                                                    @RequestParam("time")@DateTimeFormat(pattern = "HH:mm:ss") LocalTime time) {
        return appointmentService.existsByDocNameAndDateAndTime(docName, date, time);
    }
    
}
