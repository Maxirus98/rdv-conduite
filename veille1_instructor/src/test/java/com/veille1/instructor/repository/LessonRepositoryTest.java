package com.veille1.instructor.repository;

import com.veille1.instructor.MockData;
import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.models.User;
import com.veille1.instructor.repositories.LessonRepository;
import com.veille1.instructor.repositories.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataMongoTest
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class LessonRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    LessonRepository lessonRepository;

    @BeforeAll
    void saveLessonTest(){
        List<User> users = MockData.getAllUsers();

        Lesson lesson = new Lesson(333, "Module 3", new Date(), new Date(), users);
        lessonRepository.save(lesson);
    }

    @Test
    void findLessonByIdTest() {
        // Arrange
        Integer id = 333;

        // Act
        Optional<Lesson> lesson = lessonRepository.findById(id);

        // Assert
        assertEquals(id, lesson.get().getId());
    }
}
