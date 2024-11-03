package com.example.health_management.healthrecord.worker;


import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;

import com.example.health_management.healthrecord.HealthRecordService;

import java.util.Collections;
import java.util.Map;

@Component
public class AdminReviewHandler {

    // Health Insurance List just temporary. A table in the DB will be added for that
    ArrayList<String> healthInsuranceList = new ArrayList<>(Arrays.asList("Health Insurance A", "Health Insurance B", "Health Insurance C", "Health Insurance D"));

    private static final Logger LOG = LoggerFactory.getLogger(AdminReviewHandler.class);
    private final HealthRecordService healthRecordService;

    public AdminReviewHandler(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @JobWorker(type = "adminReview", autoComplete = false)
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling admin review for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        String patientID = (String) variables.get("patientID");
        String healthInsuranceName = (String) variables.get("healthInsuranceName");
        LOG.info("Received healthInsuranceName: {}", healthInsuranceName);



        if (!healthInsuranceList.contains(healthInsuranceName)) {
            LOG.info("Health Insurance validation failed for Patient ID {}", patientID);
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("success", false))
                    .send()
                    .join();
        }
        client.newCompleteCommand(job.getKey())
                .variables(Collections.singletonMap("success", true))
                .send()
                .join();

        if(job.getBpmnProcessId().equals("createHealthRecord")){
            healthRecordService.storeRecord(variables);
        }else{
            healthRecordService.updateRecord(variables);
        }

    }
}