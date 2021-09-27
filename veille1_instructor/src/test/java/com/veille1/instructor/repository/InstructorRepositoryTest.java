package com.veille1.instructor.repository;

import com.veille1.instructor.MockData;
import com.veille1.instructor.models.Instructor;
import com.veille1.instructor.repositories.InstructorRepository;
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
@DataMongoTest
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class InstructorRepositoryTest {

    @Autowired
    InstructorRepository instructorRepository;

    @BeforeAll
    void saveInstructor(){
        List<Instructor> instructors = MockData.getAllInstructors();
        instructorRepository.saveAll(instructors);
    }

    @Test
    void findByIdTest() {
        // Arrange
        Integer id = 333;

        // Act
        Optional<Instructor> instructor = instructorRepository.findById(id);

        // Assert
        assertEquals(id, instructor.get().getId());
    }
}
