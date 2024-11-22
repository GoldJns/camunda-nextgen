package com.example.health_management.appointment.worker;

import com.example.health_management.appointment.AppointmentRepository;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;

@Component
public class CreateAppointmentHandler {

    private static final Logger LOG = LoggerFactory.getLogger(CreateAppointmentHandler.class);
    private final AppointmentRepository appointmentRepository;

    public CreateAppointmentHandler(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @JobWorker(type = "showAppointment", autoComplete = false)
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling show appointment for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        String userID = (String) variables.get("userID");
        if(appointmentRepository.findByUserID(userID).isEmpty()) {
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("exists", false))
                    .send()
                    .join();
        }else {
            LOG.error("Creating show appointment failed. Health record already exists for patient username {}", userID);
            client.newCompleteCommand(job.getKey())
                    .variables(Collections.singletonMap("exists", true))
                    .send()
                    .join();
        }
    }
}
    