package com.example.health_management.task;

import io.camunda.tasklist.dto.TaskList;
import io.camunda.tasklist.dto.Variable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<TaskList> getTasks(
            @RequestParam(value = "assignee") String assignee,
            @RequestParam(value = "group")  String group) {

        TaskList tasks = taskService.getTasks(assignee, group);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/{taskId}/complete")
    public ResponseEntity<String> completeTask(
            @PathVariable String taskId, @RequestBody Map<String, Object> variables) {

        Boolean completed = taskService.completeTask(taskId, variables);

        if(completed){
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{taskId}/variables")
    public ResponseEntity<List<Variable>> getTaskVariables(
            @PathVariable String taskId) {

        List<Variable> variables = taskService.getTaskVariables(taskId);
        return ResponseEntity.ok(variables);
    }
}
