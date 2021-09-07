package com.veille1.instructor.repositories;

import com.veille1.instructor.models.Lesson;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LessonRepoitory extends MongoRepository<Lesson, Integer> {
    public Lesson findById(int id);
}
