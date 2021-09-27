package com.veille1.instructor.service;

import com.veille1.instructor.MockData;
import com.veille1.instructor.models.Instructor;
import com.veille1.instructor.repositories.InstructorRepository;
import com.veille1.instructor.services.InstructorService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class InstructorServiceTest {

    @Mock
    InstructorRepository instructorRepository;

    @InjectMocks
    InstructorService instructorService;

    @Test
    void getAllInstructor(){

        // Arrange
        List<Instructor> instructors = MockData.getAllInstructors();
        when(instructorRepository.findAll()).thenReturn(instructors);

        // Act
        List<Instructor> serviceInstructors = instructorService.getAllInstructors();

        // Assert
        assertEquals(instructors, serviceInstructors);
    }

    @Test
    void getInstructor() {
        // Arrange
        Integer id = 333;
        Instructor instructor = MockData.getAllInstructors().get(0);
        when(instructorRepository.findById(instructor.getId())).thenReturn(instructor);

        // Act
        Instructor serviceInstructor = instructorService.getInstructor(id);

         // Assert
        assertEquals(instructor, serviceInstructor);
    }
 }
