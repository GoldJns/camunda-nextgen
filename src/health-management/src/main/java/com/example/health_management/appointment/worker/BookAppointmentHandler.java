package com.example.health_management.appointment.worker;

import com.example.health_management.appointment.AppointmentService;
import com.example.health_management.user.model.UserEntity;
import com.example.health_management.user.service.UserService;

import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;

@Component
public class BookAppointmentHandler {

    private static final Logger LOG = LoggerFactory.getLogger(validateAppointmentHandler.class);
    private final UserService userService;
    private final AppointmentService appointmentService;

    public BookAppointmentHandler(AppointmentService appointmentService,  UserService userService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
    }

    @JobWorker(type = "bookAppointment")
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling storeAppointment for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        String username = (String) variables.get("username");
        UserEntity user = userService.findUser(username);

        if (user == null) {
            LOG.error("User not found for username: {}", username);
    
            client.newFailCommand(job.getKey())
                    .retries(0)
                    .errorMessage("User not found")
                    .send()
                    .join();
        } else {
            appointmentService.saveOrUpdate(variables, user.getId());
    
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("success", true))
                    .send()
                    .join();
    
            LOG.info("Job successfully completed");
           
        }
    }
}
