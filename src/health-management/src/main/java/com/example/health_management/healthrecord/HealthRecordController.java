package com.example.health_management.healthrecord;

import com.example.health_management.healthrecord.model.dto.HealthRecordDTO;
import com.example.health_management.healthrecord.service.HealthRecordService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@ResponseStatus(HttpStatus.OK)
@RequestMapping("/api/health-records")
public class HealthRecordController {

    private final HealthRecordService healthRecordService;

    HealthRecordController(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @PostMapping("/create/{username}")
    public void createHealthRecord(@PathVariable String username) {
        healthRecordService.startCreateHealthRecordProcess(username);
    }

    @PostMapping("/edit/{username}")
    public void editHealthRecord(@PathVariable String username) {
        healthRecordService.startEditHealthRecordProcess(username);
    }

    @DeleteMapping("/delete/{username}")
    public void deleteHealthRecord(@PathVariable String username) {
        healthRecordService.startDeleteHealthRecordProcess(username);
    }

    @PostMapping("/leavePractice/{username}")
    public void leavePractice(@PathVariable String username) {
        healthRecordService.leavePractice(username);
    }

    @GetMapping("/find/{username}")
    public HealthRecordDTO findHealthRecord(@PathVariable String username) {
        return healthRecordService.findHealthRecord(username);
    }

    @GetMapping("/findAll")
    public List<HealthRecordDTO> findHealthRecord() {
        return healthRecordService.findAllHealthRecords();
    }
}