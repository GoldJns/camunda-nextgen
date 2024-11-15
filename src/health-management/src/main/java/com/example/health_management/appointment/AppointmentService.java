package com.example.health_management.appointment;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.health_management.TaskListClient;

import io.camunda.zeebe.client.ZeebeClient;

@Service
public class AppointmentService {
    
    private static final Logger log = LoggerFactory.getLogger(AppointmentService.class);

    @Value("${process.appointment.create.process-id}")
    private String createAppointmentProcessId;
    @Value("${process.appointment.edit.process-id}")
    private String editAppointmentProcessId;

    private final TaskListClient tasklistClient;
    
    private final ZeebeClient zeebeClient;
    
    @Autowired
    private AppointmentRepository appointmentRepository;

    public AppointmentService(TaskListClient tasklistClient, ZeebeClient zeebeClient, AppointmentRepository appointmentRepository) {
        this.tasklistClient = tasklistClient;
        this.zeebeClient = zeebeClient;
        this.appointmentRepository = appointmentRepository;
    }

    public AppointmentEntity saveOrUpdate(AppointmentEntity appointment) {
        return appointmentRepository.save(appointment);
    }

    public Optional<AppointmentEntity> getByID(Long id) {
        return appointmentRepository.findById(id);
    }

    public List<AppointmentEntity> getByUserID(String id) {
        return appointmentRepository.findByUserID(id);
    }

    public void delete(AppointmentEntity appointment) {
        appointmentRepository.delete(appointment);
    }
    
    public Long startCreateAppointmentProcess(String username) {
        var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(createAppointmentProcessId)
                .latestVersion()
                .variables(Map.of("username", username))
                .send()
                .join();
        log.info("started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
        return event.getProcessInstanceKey();
    }

    public Long startEditAppointmentProcess(String userID) {
        var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(editAppointmentProcessId)
                .latestVersion()
                .variables(Map.of("userID", userID))
                .send()
                .join();
        log.info("started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
        return event.getProcessInstanceKey();
    }

    // private void setVariables(AppointmentEntity appointment, Map<String, Object> variables){
    //     appointment.setMonth(variables.get("month").toString());
    //     appointment.setDay(variables.get("day").toString());
    //     appointment.setDate(variables.get("date").toString());
    //     appointment.setTime(variables.get("time").toString());
    // }
}
