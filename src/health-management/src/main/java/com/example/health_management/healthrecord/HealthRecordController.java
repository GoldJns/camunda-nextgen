package com.example.health_management.healthrecord;

import io.camunda.tasklist.dto.Form;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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