package com.example.health_management.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    
    // private int userId;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private int age;
    private String role;// patient or Doctor

}
