package com.example.health_management.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_management.user.config.AppUserDetailsService;
import com.example.health_management.user.config.JwtUtil;
import com.example.health_management.user.dto.AuthenticationRequestDto;
import com.example.health_management.user.dto.AuthenticationResponseDto;




@RestController
@RequestMapping("/auth")
public class AuthController {
   /*
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AppUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("register")
    public ResponseEntity<AuthenticationResponseDto> register(@RequestBody UserDto registerDto) {

        User optUser = userRepository.findByEmail(registerDto.getEmail());

        if (optUser != null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            User entityUser = toEntity(registerDto);
            entityUser.setPassword(new BCryptPasswordEncoder().encode((registerDto.getPassword())));
            
            userRepository.save(entityUser);

            AuthenticationRequestDto authDTO = new AuthenticationRequestDto(registerDto.getEmail(), registerDto.getPassword());
            AuthenticationResponseDto authResponse = createAuthenticationToken(authDTO);

            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        }
    }

    @PostMapping("login")
    public ResponseEntity<AuthenticationResponseDto> login(@RequestBody AuthenticationRequestDto authenticationDTO) {

        return  new ResponseEntity<>(createAuthenticationToken(authenticationDTO), HttpStatus.OK);

    }

    private AuthenticationResponseDto createAuthenticationToken(AuthenticationRequestDto authenticationRequestDTO)
            throws BadCredentialsException, UsernameNotFoundException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequestDTO.getEmail(),
            authenticationRequestDTO.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password!");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequestDTO.getEmail());

        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        return new AuthenticationResponseDto(jwt);

    }

    @GetMapping("user")
    public ResponseEntity<UserDto> fetchUser(@RequestHeader("Authorization") String token) {
        String jwt;
        String[] headerParts = token.split(" ");
        jwt = headerParts[1];
        UserDto userResponseDto = toDto(userRepository.findByEmail(jwtUtil.extractUsername(jwt)));

        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    public User toEntity(UserDto userDto){
        User user = new User(userDto.getEmail(), userDto.getPassword(), userDto.getRole(),
                             userDto.getFirstname(), userDto.getLastname(), userDto.getAge());
        return user;
    }

    public UserDto toDto(User user){
        UserDto userDto = new UserDto(user.getEmail(), user.getPassword(), user.getRole(), 
                                user.getFirstname(), user.getLastname(), user.getAge());
        return userDto;
    }

    */
}
