package com.example.health_management.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    
    private int userId;
    private String email;
    private String password;
    private String role;// patient or Doctor
    private String firstname;
    private String lastname;
    private int age;

    public UserDto(String email, String password, String role, String firstname, String lastname, int age) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
    }

}
