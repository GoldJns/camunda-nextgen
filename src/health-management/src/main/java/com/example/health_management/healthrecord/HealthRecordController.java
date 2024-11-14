package com.example.health_management.healthrecord;

import io.camunda.tasklist.dto.Form;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/health-records")
public class HealthRecordController {

    private final HealthRecordService healthRecordService;

    HealthRecordController(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @PostMapping("/create/{username}")
    public ResponseEntity<Long> createHealthRecord(@PathVariable String username) {

        Long processInstanceId = healthRecordService.startCreateHealthRecordProcess(username);
        if (processInstanceId == null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(null);
        }
        return ResponseEntity.ok(processInstanceId);
    }

    @PostMapping("/edit/{username}")
    public ResponseEntity<Long> editHealthRecord(@PathVariable String username) {

        Long processInstanceId = healthRecordService.startEditHealthRecordProcess(username);
        return ResponseEntity.ok(processInstanceId);
    }

      @DeleteMapping("/delete/{username}")
      public ResponseEntity<Long> deleteHealthRecord(@PathVariable String username) {
      Long processInstanceId = healthRecordService.startDeleteHealthRecordProcess(username);
      return ResponseEntity.ok(processInstanceId);
      }

    @PostMapping("/leavePractice/{username}")
    public ResponseEntity<String> leavePractice(@PathVariable String username) {
        healthRecordService.leavePractice(username);
        return ResponseEntity.ok("Patient marked successfully as left");
    }
}