package com.example.health_management.appointment.worker;

import com.example.health_management.appointment.AppointmentEntity;
import com.example.health_management.appointment.AppointmentService;
import com.example.health_management.healthrecord.service.HealthRecordService;
import com.example.health_management.user.model.UserEntity;
import com.example.health_management.user.service.UserService;

import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class DeleteAppointentHandler {

    private static final Logger LOG = LoggerFactory.getLogger(DeleteAppointentHandler.class);
    private final AppointmentService appointmentService;

    public DeleteAppointentHandler(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @JobWorker(type = "deleteAppointment")
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling delete Appointment for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        long appointmentID =  (Integer) variables.get("id");

        appointmentService.deleteById(appointmentID);
    }
}
