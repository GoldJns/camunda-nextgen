package com.example.health_management.healthrecord.service;

import com.example.health_management.healthrecord.HealthRecordController;
import com.example.health_management.healthrecord.repository.HealthRecordRepository;
import com.example.health_management.healthrecord.model.HealthRecordEntity;
import com.example.health_management.healthrecord.model.dto.HealthRecordDTO;
import com.example.health_management.user.model.UserEntity;
import com.example.health_management.user.service.UserService;

import io.camunda.zeebe.client.ZeebeClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
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


    private final ZeebeClient zeebeClient;
    private final HealthRecordRepository healthRecordRepository;
    private final UserService userService;

    public HealthRecordService(ZeebeClient zeebeClient, HealthRecordRepository healthRecordRepository, UserService userService) {
        this.zeebeClient = zeebeClient;
        this.healthRecordRepository = healthRecordRepository;
        this.userService = userService;
    }

    public void startCreateHealthRecordProcess(String username) {
        var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(createHealthRecordProcessId)
                .latestVersion()
                .variables(Map.of("username", username))
                .send()
                .join();
        LOG.info("started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
    }

    public void startEditHealthRecordProcess(String username) {
        var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(editHealthRecordProcessId)
                .latestVersion()
                .variables(Map.of("username", username))
                .send()
                .join();
        LOG.info("started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
    }

    public void startDeleteHealthRecordProcess(String username) {
        var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(deleteHealthRecordProcessId)
                .latestVersion()
                .variables(Map.of("username", username))
                .send()
                .join();
        LOG.info("started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
    }

    public void storeRecord(Map<String, Object> variables) {
        HealthRecordEntity healthRecord = new HealthRecordEntity();
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

    public void leavePractice(String username) {
        HealthRecordEntity healthRecord = healthRecordRepository.findByUsername(username).get(0);
        healthRecord.setHasLeft(true);
        healthRecordRepository.save(healthRecord);
    }

    public HealthRecordDTO findHealthRecord(String username) {
        return healthRecordRepository.findByUsername(username).get(0).toDTO();
    }

    public List<HealthRecordDTO> findAllHealthRecords() {
        List<HealthRecordEntity> healthRecords = healthRecordRepository.findAll();
        return healthRecords.stream()
                .map(HealthRecordEntity::toDTO)
                .toList();
    }

    private void setVariables(HealthRecordEntity healthRecord, Map<String, Object> variables) {

            UserEntity user = userService.findUser(variables.get("username").toString());

            System.out.println(user);
            healthRecord.setUsername(variables.get("username").toString());
            healthRecord.setAllergies(variables.get("allergies").toString());
            healthRecord.setMedicalHistory(variables.get("medicalHistory").toString());
            healthRecord.setDiagnoses(variables.get("diagnoses").toString());
            healthRecord.setMedicines(variables.get("medicine").toString());
            healthRecord.setHealthInsurance(variables.get("healthInsuranceName").toString());
            healthRecord.setUserId(user.getId());

    }
}