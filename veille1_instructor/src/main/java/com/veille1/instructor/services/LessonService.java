package com.veille1.instructor.services;

import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.repositories.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService{

    @Autowired
    private LessonRepository lessonRepository;

    public List<Lesson> getAllLessons(){
        return lessonRepository.findAll();
    }

    public Lesson addLesson(Lesson lesson){
        return lessonRepository.save(lesson);
    }

    public Lesson getLesson(int id){
        return lessonRepository.findById(id);
    }

    public void deleteLesson(int id){
        lessonRepository.deleteById(id);
    }
}
