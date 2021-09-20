package com.veille1.instructor.repositories;

import com.veille1.instructor.models.Instructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructorRepository extends MongoRepository<Instructor, Integer> {
    public Instructor findById(int id);
}
