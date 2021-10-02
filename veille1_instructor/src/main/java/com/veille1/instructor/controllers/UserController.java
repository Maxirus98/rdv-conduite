package com.veille1.instructor.controllers;
import com.veille1.instructor.dto.UserDto;
import com.veille1.instructor.models.User;
import com.veille1.instructor.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<User> saveUser(@RequestBody UserDto userDto){
        if(userService.getUser(userDto.getEmail()) != null) {
            return new ResponseEntity("The user already exists", HttpStatus.SEE_OTHER);
        }

        return ResponseEntity.ok(userService.saveUser(UserDto.dtoToEntity(userDto)));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAll(){
        List<UserDto> userDtoList = userService.getAllUsers().stream().map(u -> {
            UserDto userDto = UserDto.entityToDto(u);
            return userDto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(userDtoList);
    }

    @DeleteMapping()
    public ResponseEntity<String> deleteUser(@RequestParam Integer id){
        User user = userService.getUser(id);
        if(user == null) {
            return new ResponseEntity("User with id " + id  + " does not exist.", HttpStatus.NOT_FOUND);
        }

        userService.deleteUser(id);
        return ResponseEntity.ok("User with id " + id  + " was deleted.");
    }
}
