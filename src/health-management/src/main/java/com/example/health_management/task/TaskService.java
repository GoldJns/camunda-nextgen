package com.example.health_management.task;

import com.example.health_management.TaskListClient;
import io.camunda.tasklist.dto.TaskList;
import io.camunda.tasklist.dto.TaskState;
import io.camunda.tasklist.dto.Variable;
import io.camunda.tasklist.exception.TaskListException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class TaskService {

    private static final Logger LOG = LoggerFactory.getLogger(TaskController.class);

    private final TaskListClient tasklistClient;

    public TaskService(TaskListClient tasklistClient) {
        this.tasklistClient = tasklistClient;
    }

    public TaskList getTasks(String assignee, String group) {
        TaskList tasks = new TaskList();
        try {
            if(group.isEmpty()) {
                tasks = tasklistClient.build().getAssigneeTasks(assignee, TaskState.CREATED, 10);
            }else{
                tasks = tasklistClient.build().getGroupTasks(group, TaskState.CREATED, 10);
            }
            LOG.info(tasks.toString());

        } catch (TaskListException e) {
            e.printStackTrace();
        }
        return tasks;
    }

    public Boolean completeTask(String taskId, Map<String, Object> variables) {
        LOG.info("Completing task with variables: " + variables);
        try {
            tasklistClient.build().completeTask(taskId, variables);
            return true;
        } catch (TaskListException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Variable> getTaskVariables(String taskId) {
        try {
            return tasklistClient.build().getVariables(taskId, true);
        } catch (TaskListException e) {
            e.printStackTrace();
        }
        return null;
    }

}
