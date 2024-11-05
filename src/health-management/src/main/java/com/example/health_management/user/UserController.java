package com.example.health_management.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        return userService.registerUser(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto loginDto) {
        return userService.loginUser(loginDto);
    }

/*
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
*/
}
