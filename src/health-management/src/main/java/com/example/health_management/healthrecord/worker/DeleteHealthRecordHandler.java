package com.example.health_management.healthrecord.worker;

import com.example.health_management.healthrecord.HealthRecordService;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class DeleteHealthRecordHandler {

    private static final Logger LOG = LoggerFactory.getLogger(AdminReviewHandler.class);
    private final HealthRecordService healthRecordService;

    public DeleteHealthRecordHandler(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @JobWorker(type = "deleteRecord")
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling delete health record for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        String patientID = (String) variables.get("patientID");

        healthRecordService.deleteRecord(patientID);
    }
}
