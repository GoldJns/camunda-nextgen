package com.example.health_management.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_management.user.model.UserDto;
import com.example.health_management.user.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/role/{role}")
    public List<UserDto> getAllUserByRole(@PathVariable String role) {
        return userService.findDoc(role);
    }
}
