package com.veille1.instructor.services;

import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.repositories.LessonRepoitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService{

    @Autowired
    private LessonRepoitory lessonRepoitory;

    public List<Lesson> getAll(){
        return lessonRepoitory.findAll();
    }

    public Lesson addLesson(Lesson lesson){
        return lessonRepoitory.save(lesson);
    }

    public Lesson getLesson(int id){
        return lessonRepoitory.findById(id);
    }
}
