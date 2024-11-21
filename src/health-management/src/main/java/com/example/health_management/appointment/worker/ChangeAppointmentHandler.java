package com.example.health_management.appointment.worker;

import java.util.Collections;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.example.health_management.appointment.AppointmentEntity;
import com.example.health_management.appointment.AppointmentService;
import com.example.health_management.user.model.UserEntity;
import com.example.health_management.user.service.UserService;

import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;

@Component
public class ChangeAppointmentHandler {

    private static final Logger LOG = LoggerFactory.getLogger(BookAppointmentHandler.class);
    private final UserService userService;
    private final AppointmentService appointmentService;

    public ChangeAppointmentHandler(AppointmentService appointmentService,  UserService userService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
    }

    @JobWorker(type = "changeAppointment")
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling changeAppointment for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        String id = (String) variables.get("id");
        Long appointmentID = Long.valueOf(id);
        String username = (String) variables.get("username");
        UserEntity user = userService.findUser(username);

        AppointmentEntity updatedAppointment = appointmentService.update(variables, user.getId(), appointmentID);

        if (updatedAppointment != null && updatedAppointment.getId() == appointmentID) {
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("success", true))
                    .send()
                    .join();
            LOG.info("Appointment updated successfully, job completed.");
        } else {
            client.newFailCommand(job.getKey())
                .retries(0)
                .errorMessage("Failed to update appointment: ")
                .send()
                .join();
        }
    }

}