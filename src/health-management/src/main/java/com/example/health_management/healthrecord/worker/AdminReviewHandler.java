package com.example.health_management.healthrecord.worker;


import com.example.health_management.healthrecord.service.HealthInsuranceService;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import com.example.health_management.healthrecord.service.HealthRecordService;
import java.util.Collections;
import java.util.Map;

@Component
public class AdminReviewHandler {

    private static final Logger LOG = LoggerFactory.getLogger(AdminReviewHandler.class);
    private final HealthRecordService healthRecordService;
    private final HealthInsuranceService healthInsuranceService;

    public AdminReviewHandler(HealthRecordService healthRecordService, HealthInsuranceService healthInsuranceService) {
        this.healthRecordService = healthRecordService;
        this.healthInsuranceService = healthInsuranceService;
    }

    @JobWorker(type = "adminReview", autoComplete = false)
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling admin review for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        String username = (String) variables.get("username");
        String healthInsuranceName = (String) variables.get("healthInsuranceName");
        LOG.info("Received healthInsuranceName: {}", healthInsuranceName);

        Boolean exists = healthInsuranceService.insuranceExists(healthInsuranceName);

        if (exists) {
            LOG.info("Health Insurance administrative review approved for username {}", username);
            handleRecord(job, variables);
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("success", true))
                    .send()
                    .join();
        }else {
            LOG.info("Health Insurance administrative review declined for username {}", username);
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("success", false))
                    .send()
                    .join();
        }

    }

    private void handleRecord(ActivatedJob job, Map<String, Object> variables) {
        if(job.getBpmnProcessId().equals("createHealthRecord")){
            healthRecordService.storeRecord(variables);
        }else{
            healthRecordService.updateRecord(variables);
        }
    }
}