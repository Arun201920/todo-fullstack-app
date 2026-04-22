package com.todo.app.controller;

import com.todo.app.model.Task;
import com.todo.app.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PostMapping("/add")
    public Task addTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @GetMapping("/user/{userId}")
    public List<Task> getTasks(@PathVariable Long userId) {
        return taskRepository.findByUserId(userId);
    }

    @PutMapping("/update/{id}")
    public Task toggleTask(@PathVariable Long id) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setCompleted(!task.isCompleted());
        return taskRepository.save(task);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}