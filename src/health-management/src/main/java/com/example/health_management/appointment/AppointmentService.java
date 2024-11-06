package com.example.health_management.appointment;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;

    public AppointmentEntity saveOrUpdate(AppointmentEntity appointment) {
        return appointmentRepository.save(appointment);
    }

    public AppointmentEntity getAppointmentByID(Long id) {
        return appointmentRepository.findAppointmentByID(id);
    }

    public List<AppointmentEntity> getAppointmentByUserID(Long id) {
        return appointmentRepository.findAppointmentByUserID(id);
    }

    public void deleteAppointment(AppointmentEntity appointment) {
        appointmentRepository.delete(appointment);
    }
}
