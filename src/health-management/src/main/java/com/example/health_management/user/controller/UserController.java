package com.example.health_management.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_management.user.model.User;
import com.example.health_management.user.service.UserService;



@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // @Autowired
    // UserModelAssembler userModelAssembler;

    // @GetMapping("/{userId}")
	// public ResponseEntity<UserResponseDto> getUserById(@PathVariable("userId") Integer userId) {
	// 	final Optional<User> userById = userService.getUserById(userId.intValue());
	// 	if(userById.isPresent()) {
	// 		User user = userById.get();
	// 		UserResponseDto userResponse = userModelAssembler.toModelResponse(user);
			
	// 		return new ResponseEntity<>(userResponse,HttpStatus.OK);
	// 	}else {
	// 		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	// 	}
	// }
	
    @GetMapping("/")
	public List<User> message(){
		return userService.getUser();
	}
    
}
