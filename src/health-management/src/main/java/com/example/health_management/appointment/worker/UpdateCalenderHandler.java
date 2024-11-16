package com.example.health_management.appointment.worker;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.example.health_management.appointment.AppointmentService;
import com.example.health_management.user.model.UserEntity;
import com.example.health_management.user.service.UserService;

import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;

@Component
public class UpdateCalenderHandler {
    
    private static final Logger LOG = LoggerFactory.getLogger(validateAppointmentHandler.class);
    private final UserService userService;
    private final AppointmentService appointmentService;

    public UpdateCalenderHandler(AppointmentService appointmentService,  UserService userService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
    }

    @JobWorker(type = "updateCalender")
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling updateCalender for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        String username = (String) variables.get("username");
        UserEntity user = userService.findUser(username);

        appointmentService.saveOrUpdate(variables, user.getId());
    }
}
