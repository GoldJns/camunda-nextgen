package com.example.health_management.healthrecord;

import java.util.List;
import java.util.Map;

import io.camunda.tasklist.dto.Variable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.camunda.tasklist.dto.Form;
import io.camunda.tasklist.dto.TaskList;


@RestController
@RequestMapping("/api/health-records")
public class HealthRecordController {

    private final HealthRecordService healthRecordService;

    HealthRecordController(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @PostMapping("/create/user/{username}")
    public ResponseEntity<Long> createHealthRecord(@PathVariable String username) {

        Long processInstanceId = healthRecordService.startCreateHealthRecordProcess(username);
        if (processInstanceId == null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(null);
        }

        return ResponseEntity.ok(processInstanceId);
    }

    /*
     * @PostMapping("/health-records/{id}/edit")
     * public ResponseEntity<Long> editHealthRecord(@PathVariable Long id,
     *
     * @RequestBody HealthRecordDTO healthRecordDTO) {
     * Long processInstanceId = healthRecordService.startEditHealthRecordProcess(id,
     * healthRecordDTO);
     * return ResponseEntity.ok(processInstanceId);
     * }
     *
     * @DeleteMapping("/health-records/{id}")
     * public ResponseEntity<Long> deleteHealthRecord(@PathVariable Long id) {
     * Long processInstanceId =
     * healthRecordService.startDeleteHealthRecordProcess(id);
     * return ResponseEntity.ok(processInstanceId);
     * }
     */
    @GetMapping("/form")
    public ResponseEntity<Form> getForm(
            @RequestParam(value = "formId") String formId,
            @RequestParam(value = "processDefinitionId") String definitionId
    ) {

        Form form = healthRecordService.getForm(formId, definitionId);
        return ResponseEntity.ok(form);
    }

}