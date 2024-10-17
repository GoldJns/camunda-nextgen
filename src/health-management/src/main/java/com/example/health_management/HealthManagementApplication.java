package com.example.health_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//import io.camunda.zeebe.spring.client.annotation.Deployment;

@SpringBootApplication
//@Deployment(resources = "classpath:demoProcess.bpmn")
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

}
