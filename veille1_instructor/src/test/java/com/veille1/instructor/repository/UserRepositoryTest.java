package com.veille1.instructor.repository;

import com.veille1.instructor.MockData;
import com.veille1.instructor.models.User;
import com.veille1.instructor.repositories.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataMongoTest
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @BeforeAll
    void saveUser(){
        List<User> users = MockData.getAllUsers();
        userRepository.saveAll(users);
    }

    @Test
    void findByIdTest() {
        // Arrange
        Integer id = 333;

        // Act
        Optional<User> user = userRepository.findById(id);

        // Assert
        assertEquals(id, user.get().getId());
    }
}
