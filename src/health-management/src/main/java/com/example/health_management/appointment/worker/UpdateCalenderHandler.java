package com.example.health_management.appointment.worker;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor
public class UpdateCalenderHandler {
    
    private static final Logger LOG = LoggerFactory.getLogger(UpdateCalenderHandler.class);

    @JobWorker(type = "updateCalender")
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling updateCalender for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        // String username = (String) variables.get("username");
        // UserEntity user = userService.findUser(username);
        // appointmentService.saveOrUpdate(variables, user.getId());

        client.newCompleteCommand(job.getKey())
        .variables(variables)
        .send()
        .join();
    }
}
