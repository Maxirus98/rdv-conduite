package com.veille1.instructor.controllers;

import com.veille1.instructor.dto.LessonDto;
import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.services.LessonService;
import lombok.extern.java.Log;
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
    public Lesson getLesson(@RequestParam int id)  {
        Lesson lesson = lessonService.getLesson(id);
        /*if(lesson == null)
            return new ResponseEntity("Lesson with id " + id + " does not exist.", HttpStatus.NOT_FOUND);*/

        return lesson;
    }

    @PostMapping("/save")
    public ResponseEntity<Lesson> saveLesson(@RequestBody LessonDto lessonDto){
        if(lessonDto.getId() == 0)
            return new ResponseEntity("The id can not be 0 or non existant", HttpStatus.BAD_REQUEST);

        return ResponseEntity.ok(lessonService.addLesson(LessonDto.dtoToEntity(lessonDto)));
    }

    @GetMapping("/all")
    public List<Lesson> getAll(){
        log.info(lessonService.getAllLessons().toString());
        return lessonService.getAllLessons();
    }

    @DeleteMapping()
    public ResponseEntity<Lesson> deleteLesson(@RequestParam int id){
        Lesson lesson = lessonService.getLesson(id);
        if(lesson == null) {
            return new ResponseEntity("Lesson with id " + id  + " does not exist.", HttpStatus.NOT_FOUND);
        }
        
        lessonService.deleteLesson(id);
        return ResponseEntity.ok(lesson);
    }

}
