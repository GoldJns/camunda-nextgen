package com.example.health_management.appointment.worker;

import com.example.health_management.appointment.AppointmentEntity;
import com.example.health_management.appointment.AppointmentRepository;
import com.example.health_management.healthrecord.repository.HealthRecordRepository;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CreateAppointmentHandler {

    private static final Logger LOG = LoggerFactory.getLogger(CreateAppointmentHandler.class);
    private final AppointmentRepository appointmentRepository;

    public CreateAppointmentHandler(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @JobWorker(type = "showAppointment", autoComplete = false)
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling show appointment for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        // String userID = (String) variables.get("userID");
        List<AppointmentEntity> appointments = appointmentRepository.findAll();

        if (appointments.isEmpty()) {
            // No appointments found
            LOG.info("No appointments found !!! ");
            client.newCompleteCommand(job.getKey())
                    .variables(Map.of(
                            "exists", false,
                            "appointments", Collections.emptyList()
                    ))
                    .send()
                    .join();
        } else {
            LOG.info("Appointments found {}", appointments);

            List<Map<String, Object>> appointmentDetails = appointments.stream()
                .map(appointment -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", appointment.getId());
                    map.put("userID", appointment.getUserID());
                    map.put("month", appointment.getMonth());
                    map.put("day", appointment.getDay());
                    map.put("date", appointment.getDate());
                    map.put("time", appointment.getTime());
                    return map;
                })
                .toList();
            client.newCompleteCommand(job.getKey())
                    .variables(Map.of(
                            "exists", true,
                            "appointments", appointmentDetails
                    ))
                    .send()
                    .join();
        }
    }

    
}
    