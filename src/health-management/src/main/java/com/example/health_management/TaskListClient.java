package com.example.health_management;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.camunda.tasklist.CamundaTaskListClient;
import io.camunda.tasklist.exception.TaskListException;

@Component
public class TaskListClient {

     @Value("${tasklist.client.base-url}")
     private String taskListUrl;

     @Value("${tasklist.client.client-id}")
     private String clientId;

     @Value("${tasklist.client.client-secret}")
     private String clientSecret;

     @Value("${tasklist.client.auth-url}")
     private String keycloakUrl;

    public CamundaTaskListClient build() {
        try {
            return CamundaTaskListClient.builder()
            .taskListUrl(taskListUrl)
            .selfManagedAuthentication(clientId, clientSecret, keycloakUrl)
            .build();
        } catch (TaskListException e) {
            throw new RuntimeException("Error tasklist client", e);
        }
    }
}