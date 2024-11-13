package com.example.health_management.healthrecord.worker;

import com.example.health_management.healthrecord.HealthRecordService;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.Map;

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

        String patientID = (String) variables.get("patientID");

        // check in DB if user exists, true or false
        Boolean hasLeft = null;

        if (hasLeft) {
            LOG.info("Deleting health record failed, patient still in practice, patient ID {}", patientID);
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("success", false))
                    .send()
                    .join();
        }
        client.newCompleteCommand(job.getKey())
                .variables(Collections.singletonMap("success", true))
                .send()
                .join();

        // healthRecordService.deleteHealthRecord(patientID);
    }
}
