package service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import model.User;
import repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    private List<User> list = new ArrayList<>(); 

    public Optional<User> getUserById(int id){
        return userRepository.findById(id);
    }
    
    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public UserService(){
        list.add(new User("mail", "pass", "doc"));
    }
    public List<User> getUser(){
        return this.list;
    }
}
