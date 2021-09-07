package com.veille1.instructor.repositories;

import com.veille1.instructor.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Integer> {
    public User findById(int id);
}
