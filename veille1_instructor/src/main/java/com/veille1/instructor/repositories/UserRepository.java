package com.veille1.instructor.repositories;

import com.veille1.instructor.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, Integer> {
    public User findById(int id);
}
