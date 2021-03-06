package com.veille1.instructor.services;

import com.veille1.instructor.models.User;
import com.veille1.instructor.models.Users;
import com.veille1.instructor.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    public UserRepository userRepository;
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User getUser(int id) {
        return userRepository.findById(id);
    }
    public User getUser(String email){return userRepository.findByEmail(email);}
    public User saveUser(User user){
        return userRepository.save(user);
    }
    public void deleteUser(int id){
        userRepository.deleteById(id);
    }
}
