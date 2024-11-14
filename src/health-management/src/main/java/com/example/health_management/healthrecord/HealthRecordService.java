package com.example.health_management.healthrecord;

import com.example.health_management.TaskListClient;
import com.example.health_management.healthrecord.model.HealthRecordEntity;
import io.camunda.tasklist.dto.Form;
import io.camunda.tasklist.exception.TaskListException;
import io.camunda.zeebe.client.ZeebeClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class HealthRecordService {

    private static final Logger LOG = LoggerFactory.getLogger(HealthRecordController.class);

    @Value("${process.health-record.create.process-id}")
    private String createHealthRecordProcessId;
    @Value("${process.health-record.edit.process-id}")
    private String editHealthRecordProcessId;
    @Value("${process.health-record.delete.process-id}")
    private String deleteHealthRecordProcessId;

    private final TaskListClient tasklistClient;
    private final ZeebeClient zeebeClient;
    private final HealthRecordRepository healthRecordRepository;

    public HealthRecordService(TaskListClient tasklistClient, ZeebeClient zeebeClient, HealthRecordRepository healthRecordRepository) {
        this.tasklistClient = tasklistClient;
        this.zeebeClient = zeebeClient;
        this.healthRecordRepository = healthRecordRepository;
    }

    public Long startCreateHealthRecordProcess(String username) {
        var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(createHealthRecordProcessId)
                .latestVersion()
                .variables(Map.of("username", username))
                .send()
                .join();
        LOG.info("started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
        return event.getProcessInstanceKey();
    }

    public Long startEditHealthRecordProcess(String username) {
        var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(editHealthRecordProcessId)
                .latestVersion()
                .variables(Map.of("username", username))
                .send()
                .join();
        LOG.info("started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
        return event.getProcessInstanceKey();
    }

    public Long startDeleteHealthRecordProcess(String username) {
        var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(deleteHealthRecordProcessId)
                .latestVersion()
                .variables(Map.of("username", username))
                .send()
                .join();
        LOG.info("started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
        return event.getProcessInstanceKey();
    }

    public void storeRecord(Map<String, Object> variables) {
        HealthRecordEntity healthRecord = new HealthRecordEntity();
        healthRecord.setUsername(variables.get("username").toString());
        setVariables(healthRecord, variables);
        healthRecordRepository.save(healthRecord);
    }

    public void updateRecord(Map<String, Object> variables) {
        HealthRecordEntity healthRecord = healthRecordRepository.findByUsername(variables.get("username").toString()).get(0);
        setVariables(healthRecord, variables);
        healthRecordRepository.save(healthRecord);
    }

    public void deleteRecord(String username) {
        HealthRecordEntity healthRecord = healthRecordRepository.findByUsername(username).get(0);
        healthRecordRepository.delete(healthRecord);
    }

    public Boolean patientHasLeft(String username) {
        HealthRecordEntity healthRecord = healthRecordRepository.findByUsername(username).get(0);
        return healthRecord.getHasLeft();
    }

    public void leavePratice(String username) {
        HealthRecordEntity healthRecord = healthRecordRepository.findByUsername(username).get(0);
        healthRecord.setHasLeft(true);
        healthRecordRepository.save(healthRecord);
    }

    private void setVariables(HealthRecordEntity healthRecord, Map<String, Object> variables){
        healthRecord.setAllergies(variables.get("allergies").toString());
        healthRecord.setChronicConditions(variables.get("chronicConditions").toString());
        healthRecord.setSurgeries(variables.get("surgeries").toString());
        healthRecord.setHealthInsurance(variables.get("healthInsuranceName").toString());
    }
}