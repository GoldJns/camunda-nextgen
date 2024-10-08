package com.example.health_management;

import org.springframework.boot.SpringApplication;

public class TestHealthManagementApplication {

	public static void main(String[] args) {
		SpringApplication.from(HealthManagementApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
