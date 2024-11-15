package com.example.health_management.appointment.worker;

import com.example.health_management.appointment.AppointmentEntity;
import com.example.health_management.appointment.AppointmentRepository;
import com.example.health_management.user.UserEntity;
import com.example.health_management.user.UserRepository;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StoreAppointmentHandler {


    private static final Logger LOG = LoggerFactory.getLogger(CreateAppointmentHandler.class);
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    public StoreAppointmentHandler(AppointmentRepository appointmentRepository,  UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    @JobWorker(type = "storeAppointment")
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling show appointment for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        String username = (String) variables.get("username");
        UserEntity user = userRepository.findByUsername(username);

        String month = (String) variables.get("month");
        String day = (String) variables.get("day");
        String date = (String) variables.get("date");
        String time = (String) variables.get("time");
        AppointmentEntity appointment = new AppointmentEntity();
        appointment.setMonth(month);
        appointment.setDay(day);

        appointmentRepository.save(appointment);


    }

}
