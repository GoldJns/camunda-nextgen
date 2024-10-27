package com.example.health_management;

import java.time.Instant;

import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.EnableZeebeClient;
import io.camunda.zeebe.spring.client.annotation.ZeebeWorker;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class HealthManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthManagementApplication.class, args);
	}
    @RestController
    public static class HelloController {
        @GetMapping("/hello")
        public String sayHello() {
            return "Hello, World!";
        }
    }

      @ZeebeWorker(type = "classify", name = "main-worker")
    public void classifyEmergency(final JobClient client, final ActivatedJob job) {
        if (job.getVariablesAsMap().get("emergencyReason") == null) { // default to ambulance if no reason is provided
            client.newCompleteCommand(job.getKey()).variables("{\"emergencyType\": \"Injured\"}").send().join();
        }else if (job.getVariablesAsMap().get("emergencyReason").toString().contains("person")) {
            client.newCompleteCommand(job.getKey()).variables("{\"emergencyType\": \"Injured\"}").send().join();
        } else if (job.getVariablesAsMap().get("emergencyReason").toString().contains("fire")) {
            client.newCompleteCommand(job.getKey()).variables("{\"emergencyType\": \"Fire\"}").send().join();
        }
    }


    @ZeebeWorker(type = "hospital", name = "main-worker")
    public void handleHospitalCoordination(final JobClient client, final ActivatedJob job) {
       
        client.newCompleteCommand(job.getKey()).send().join();
    }

    @ZeebeWorker(type = "firefighters", name = "main-worker")
    public void handleFirefighterCoordination(final JobClient client, final ActivatedJob job) {
       
        client.newCompleteCommand(job.getKey()).send().join();
    }


  

}
