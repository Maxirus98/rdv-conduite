package com.veille1.instructor.service;

import com.veille1.instructor.MockData;
import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.models.User;
import com.veille1.instructor.repositories.LessonRepository;
import com.veille1.instructor.services.LessonService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LessonServiceTest {

    @Mock
    LessonRepository lessonRepository;

    @InjectMocks
    LessonService lessonService;

    @Test
    void getAllLessons() {
        // Arrange
        when(lessonRepository.findAll()).thenReturn(MockData.getAllLessons());

        // Act
        List<Lesson> serviceLessons = lessonService.getAllLessons();

        // Assert
        assertThat(serviceLessons.size()).isEqualTo(2);
    }

    @Test
    void getLesson() {
        // Arrange
        Integer id = 333;
        Lesson lesson = MockData.getAllLessons().get(0);
        when(lessonRepository.findById(lesson.getId())).thenReturn(lesson);

        // Act
        Lesson serviceLesson = lessonService.getLesson(id);

        // Assert
        assertThat(serviceLesson.getId()).isEqualTo(id);
    }

    @Test
    void saveLesson() {
        // Arrange
        Lesson lesson = MockData.getAllLessons().get(0);
        when(lessonRepository.save(lesson)).thenReturn(lesson);

        // Act
        Lesson serviceLesson = lessonService.addLesson(lesson);

        // Assert
        assertEquals(lesson, serviceLesson);
    }

    @Test
    void deleteLesson(){
        // Arrange
        Integer id = 333;
        Lesson lesson = MockData.getAllLessons().get(0);

        // Act
        lessonRepository.deleteById(lesson.getId());

        // Assert
        verify(lessonRepository, times(1)).deleteById(id);
    }
}
