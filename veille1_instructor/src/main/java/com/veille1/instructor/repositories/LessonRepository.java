package com.veille1.instructor.repositories;

import com.veille1.instructor.models.Lesson;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends MongoRepository<Lesson, Integer> {
    public Lesson findById(int id);
}
