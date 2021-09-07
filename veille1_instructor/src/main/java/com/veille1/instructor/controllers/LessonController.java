package com.veille1.instructor.controllers;

import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.services.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("lesson")
public class LessonController {
    @Autowired
    LessonService lessonService;

    @GetMapping
    public ResponseEntity<Lesson> getLesson(@RequestParam int id){
        return ResponseEntity.ok(lessonService.getLesson(id));
    }

    @PostMapping("/save")
    public Lesson saveLesson(@RequestBody Lesson lesson){
        return lessonService.addLesson(lesson);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Lesson>> getAll(){
        return ResponseEntity.ok(lessonService.getAll());
    }

}
