package com.example.health_management.healthrecord.worker;

import com.example.health_management.healthrecord.repository.HealthRecordRepository;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;

@Component
public class RedundantHealthRecordCheckHandler {

    private static final Logger LOG = LoggerFactory.getLogger(RedundantHealthRecordCheckHandler.class);
    private final HealthRecordRepository healthRecordRepository;

    public RedundantHealthRecordCheckHandler(HealthRecordRepository healthRecordRepository) {
        this.healthRecordRepository = healthRecordRepository;
    }

    @JobWorker(type = "redundantHealthRecordCheck", autoComplete = false)
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling redundant health record check for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        String username = (String) variables.get("username");
        boolean isEmpty = healthRecordRepository.findByUsername(username).isEmpty();
        System.out.println(isEmpty);
        if(isEmpty) {
            LOG.error("Creating health record proceeds. Health record doesnt exists for patient username {}", username);
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("exists", false))
                    .send()
                    .join();
        }else {
            LOG.error("Creating health record failed. Health record already exists for patient username {}", username);
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("exists", true))
                    .send()
                    .join();
        }
    }
}
