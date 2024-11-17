package com.example.health_management.appointment.worker;

import com.example.health_management.appointment.AppointmentService;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.Map;

@Component
public class validateAppointmentHandler {

    private static final Logger LOG = LoggerFactory.getLogger(validateAppointmentHandler.class);
    private final AppointmentService appointmentService;

    public validateAppointmentHandler(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @JobWorker(type = "validateAppointment", autoComplete = false)
    public void handle(JobClient client, ActivatedJob job) {
        LOG.info("Handling validateAppointment for process instance {}", job.getProcessInstanceKey());
        Map<String, Object> variables = job.getVariablesAsMap();

        boolean availabilty = appointmentService.existsByDocNameAndMonthAndDayAndDateAndTime(variables.get("docName").toString(),
                                                            variables.get("month").toString(),
                                                            variables.get("day").toString(), 
                                                            LocalDate.parse(variables.get("date").toString()), 
                                                            LocalTime.parse(variables.get("time").toString()));
        LOG.info("availabilty {}", availabilty);
        
        if(availabilty){
            LOG.info("Appointment Available !!!");
            client.newCompleteCommand(job.getKey())
            .variables(Collections.singletonMap("exists", true))
                .send()
                .join();
        }else{
            LOG.info("Appointment not Available !!!");
            client.newCompleteCommand(job.getKey())
                .variables(Collections.singletonMap("exists", false))
                .send()
                .join();
        }//else
    }
}
    