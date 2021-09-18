package com.veille1.instructor.controllers;

import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.services.LessonService;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("lesson")
@CrossOrigin("http://localhost:3000")
@Log
public class LessonController {
    @Autowired
    LessonService lessonService;

    @GetMapping
    public ResponseEntity<Lesson> getLesson(@RequestParam int id)  {
        Lesson lesson = lessonService.getLesson(id);
        if(lesson == null)
            return new ResponseEntity("Lesson with id " + id + " does not exist.", HttpStatus.NOT_FOUND);

        return ResponseEntity.ok(lesson);
    }

    @PostMapping("/save")
    public ResponseEntity<Lesson> saveLesson(@RequestBody Lesson lesson) throws Exception{
        if(lesson.getId() == 0)
            return new ResponseEntity("The id can not be 0 or non existant", HttpStatus.BAD_REQUEST);

        return ResponseEntity.ok(lessonService.addLesson(lesson));
    }

    @GetMapping("/all")
    public List<Lesson> getAll(){
        log.info(lessonService.getAll().toString());
        return lessonService.getAll();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Lesson> deleteLesson(@RequestParam int id){
        Lesson lesson = lessonService.getLesson(id);
        if(lesson == null) {
            return new ResponseEntity("Lesson with id " + id  + " does not exist.", HttpStatus.NOT_FOUND);
        }
        
        lessonService.deleteLesson(id);
        return ResponseEntity.ok(lesson);
    }

}
