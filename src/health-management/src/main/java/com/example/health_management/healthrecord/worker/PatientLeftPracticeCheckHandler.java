package com.example.health_management.healthrecord.worker;

import com.example.health_management.healthrecord.service.HealthRecordService;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;

@Component
public class PatientLeftPracticeCheckHandler {

    private static final Logger LOG = LoggerFactory.getLogger(AdminReviewHandler.class);
    private final HealthRecordService healthRecordService;

    public PatientLeftPracticeCheckHandler(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @JobWorker(type = "patientLeftPracticeCheck", autoComplete = false)
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling check if patient has left practice for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        String username = variables.get("username").toString();

        Boolean hasLeft = healthRecordService.patientHasLeft(username);

        if (!hasLeft) {
            LOG.info("Deleting health record failed, patient still in practice, patient ID {}", username);
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("hasLeft", false))
                    .send()
                    .join();
        }
        client.newCompleteCommand(job.getKey())
                .variables(Collections.singletonMap("hasLeft", true))
                .send()
                .join();
    }
}
