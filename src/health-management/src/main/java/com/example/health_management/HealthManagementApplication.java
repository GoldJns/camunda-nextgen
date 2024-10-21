package com.example.health_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.spring.client.annotation.JobWorker;




@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class HealthManagementApplication{

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
    @JobWorker(type = "foo")
public void handleJobFoo(final ActivatedJob job) {
  
}
}
