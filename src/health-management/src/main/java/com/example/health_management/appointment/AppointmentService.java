package com.example.health_management.appointment;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.time.LocalTime;
import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.camunda.zeebe.client.ZeebeClient;

@Service
public class AppointmentService {
    
    private static final Logger log = LoggerFactory.getLogger(AppointmentService.class);

    @Value("${process.appointment.create.process-id}")
    private String createAppointmentProcessId;
    @Value("${process.appointment.edit.process-id}")
    private String editAppointmentProcessId;
    @Value("${process.appointment.delete.process-id}")
    private String deleteAppointmentProcessId;

    private final ZeebeClient zeebeClient;
    
    @Autowired
    private AppointmentRepository appointmentRepository;

    public AppointmentService(ZeebeClient zeebeClient, AppointmentRepository appointmentRepository) {
        this.zeebeClient = zeebeClient;
        this.appointmentRepository = appointmentRepository;
    }

    public AppointmentEntity save(Map<String, Object> variables, String userID) {
        AppointmentEntity appointment = new AppointmentEntity();
        appointment.setUserID(userID);
        setVariables(appointment, variables);
        return appointmentRepository.save(appointment);
    }

    public AppointmentEntity update(Map<String, Object> variables, String userID, long appointmentID) {
        AppointmentEntity appointment = new AppointmentEntity();
        appointment.setId(appointmentID);
        appointment.setUserID(userID);
        setVariables(appointment, variables);
        return appointmentRepository.save(appointment);
    }

    public Optional<AppointmentEntity> getByID(Long id) {
        return appointmentRepository.findById(id);
    }

    public List<AppointmentEntity> getByUserID(String userID) {
        return appointmentRepository.findByUserID(userID);
    }

    public List<AppointmentEntity> findAll() {
        return appointmentRepository.findAll();
    }

    public boolean existsByDocNameAndDateAndTime(String docName, LocalDate date, LocalTime time) {
        return appointmentRepository.findByDocNameAndDateAndTime(docName, date, time) == null;
    }

    public void deleteById(long id) {
        appointmentRepository.deleteById(id);
    }
    
    public ResponseEntity<?> startCreateAppointmentProcess(String username) {
        try { 
            var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(createAppointmentProcessId)
                .latestVersion()
                .variables(Map.of("username", username))
                .send()
                .join();

            log.info("Started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
            
            return ResponseEntity.ok("Process started successfully");
        } catch (Exception e) {
            log.error("Error starting process", e);
            return ResponseEntity.status(500).body("Error starting process");
        }
    }

    public ResponseEntity<?> startEditAppointmentProcess(String username) {
        try { 
            var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(editAppointmentProcessId)
                .latestVersion()
                .variables(Map.of("username", username))
                .send()
                .join();

            log.info("Started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
            
            return ResponseEntity.ok("Process started successfully");
        } catch (Exception e) {
            log.error("Error starting process", e);
            return ResponseEntity.status(500).body("Error starting process");
        }
    }

    public ResponseEntity<?> startDeleteAppointmentProcess(long id) {
        try { 
            var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(deleteAppointmentProcessId)
                .latestVersion()
                .variables(Map.of("id", id))
                .send()
                .join();

            log.info("Started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
            
            return ResponseEntity.ok("Process started successfully");
        } catch (Exception e) {
            log.error("Error starting process", e);
            return ResponseEntity.status(500).body("Error starting process");
        }
    }

    private void setVariables(AppointmentEntity appointment, Map<String, Object> variables){
        appointment.setDocName(variables.get("docName").toString());
        appointment.setDate(LocalDate.parse(variables.get("date").toString()));
        appointment.setTime(LocalTime.parse(variables.get("time").toString()));
    }
}
