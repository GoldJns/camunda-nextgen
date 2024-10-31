package com.example.health_management.healthrecord;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.health_management.TaskListClient;
import com.example.health_management.healthrecord.model.HealthRecordEntity;

import io.camunda.tasklist.dto.Form;
import io.camunda.tasklist.dto.TaskList;
import io.camunda.tasklist.dto.TaskState;
import io.camunda.tasklist.dto.Variable;
import io.camunda.tasklist.exception.TaskListException;
import io.camunda.zeebe.client.ZeebeClient;

@Service
public class HealthRecordService {

    private static final Logger LOG = LoggerFactory.getLogger(HealthRecordController.class);

    @Value("${process.health-record.create.definition-id}")
    private String definitionId;

    @Value("${process.health-record.create.process-id}")
    private String processId;

    private final TaskListClient tasklistClient;
    private final ZeebeClient zeebeClient;
    private final HealthRecordRepository healthRecordRepository;

    public HealthRecordService(TaskListClient tasklistClient, ZeebeClient zeebeClient, HealthRecordRepository healthRecordRepository) {
        this.tasklistClient = tasklistClient;
        this.zeebeClient = zeebeClient;
        this.healthRecordRepository = healthRecordRepository;
    }

    public Long startCreateHealthRecordProcess(String username) { 

        if(healthRecordRepository.findByUsername(username).isEmpty()) {

        var event = zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId(processId)
                .latestVersion()
                .variables(Map.of("username", username))
                .send()
                .join();
                
        LOG.info("started a process with key " + event.getProcessDefinitionKey() + ", instance key: " + event.getProcessInstanceKey());
        

        return event.getProcessInstanceKey();
        }else{
            return null;
        }
    }

/*
    public Long startEditHealthRecordProcess(Long id, HealthRecordDTO healthRecordDTO) {
       
        return null;
    }

    public Long startDeleteHealthRecordProcess(Long id) {
        
        return null;
    }
*/

    public TaskList getTasksForHealthRecordProcesses(String assignee, String group) {
        TaskList tasks = new TaskList();
        try {
            if(group.isEmpty()) {
                tasks = tasklistClient.build().getAssigneeTasks(assignee, TaskState.CREATED, 10);
            }else{
                tasks = tasklistClient.build().getGroupTasks(group, TaskState.CREATED, 10);
            }
            LOG.info(tasks.toString());
            
        } catch (TaskListException e) {
            e.printStackTrace();
        }
        return tasks;
    }

    public Boolean completeTask(String taskId, Map<String, Object> variables) {
        LOG.info("Completing task with variables: " + variables);
        try {
            tasklistClient.build().completeTask(taskId, variables);
            return true;
        } catch (TaskListException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Variable> getTaskVariables(String taskId) {
        try {
            return tasklistClient.build().getVariables(taskId, true);
        } catch (TaskListException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void storeRecord(Map<String, Object> variables) {
        HealthRecordEntity healthRecord = new HealthRecordEntity();

        healthRecord.setUsername(variables.get("username").toString());
        healthRecord.setAllergies(variables.get("allergies").toString());
        healthRecord.setChronicConditions(variables.get("chronicConditions").toString());
        healthRecord.setSurgeries(variables.get("surgeries").toString());
        healthRecord.setHealthInsurance(variables.get("healthInsuranceName").toString());

        healthRecordRepository.save(healthRecord);
    }

    public Form getForm(String formId) {
        Form form = new Form();
        try {
            form = tasklistClient.build().getForm(formId, definitionId);
        } catch (TaskListException e) {
            e.printStackTrace();
        }
        return form;
    }
}