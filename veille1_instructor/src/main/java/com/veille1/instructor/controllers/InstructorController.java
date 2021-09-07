package com.veille1.instructor.controllers;

import com.veille1.instructor.models.Instructor;
import com.veille1.instructor.services.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor")
public class InstructorController {
    @Autowired
    InstructorService instructorService;

    @GetMapping("/all")
    public ResponseEntity<List<Instructor>> getAll(){
        return ResponseEntity.ok(instructorService.getAll());
    }

    @GetMapping
    public Instructor getInstructor(@RequestParam int id) {
        return instructorService.getInstructor(id);
    }

    @PostMapping("/save")
    public Instructor saveInstructor(@RequestBody Instructor instructor) {
        return instructorService.saveInstructor(instructor);
    }
}