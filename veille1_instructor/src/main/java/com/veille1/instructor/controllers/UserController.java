package com.veille1.instructor.controllers;
import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.models.User;
import com.veille1.instructor.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    public UserService userService;

    @GetMapping
    public User getUser(@RequestParam int id){
        return userService.getUser(id);
    }

    @PostMapping("/save")
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
