package com.veille1.instructor.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.veille1.instructor.MockData;
import com.veille1.instructor.controllers.LessonController;
import com.veille1.instructor.controllers.UserController;
import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.models.User;
import com.veille1.instructor.services.LessonService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.mockito.Mockito.when;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import java.util.List;

@WebMvcTest(LessonController.class)
public class LessonControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    LessonService lessonService;

    @Test
    void getAllLessons() throws Exception {
        // Arrange
        List<Lesson> lessons = MockData.getAllLessons();
        when(lessonService.getAllLessons()).thenReturn(lessons);

        // Act
        MvcResult result = mockMvc.perform(get("/lesson/all")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        // Assert
        var actuals = new ObjectMapper()
                .readValue(result.getResponse().getContentAsString(), List.class);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
    }

    @Test
    void getLessonTest() throws Exception {
        // Arrange
        Integer id = 333;
        Lesson lesson = MockData.getAllLessons().get(0);
        when(lessonService.getLesson(lesson.getId())).thenReturn(lesson);

        // Act
        MvcResult result = mockMvc.perform((get("/lesson?id="+id)
                .contentType(MediaType.APPLICATION_JSON)))
                .andReturn();

        // Assert
        var actuals = new ObjectMapper()
                .readValue(result.getResponse().getContentAsString(), Lesson.class);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals).isEqualTo(lesson);
    }

    @Test
    void deleteLesson() {
        // Arrange
        Lesson lesson = MockData.getAllLessons().get(0);

        // Act
        lessonService.addLesson(lesson);
        lessonService.deleteLesson(lesson.getId());

        // Assert
        assertThat(lessonService.getLesson(lesson.getId())).isEqualTo(null);
    }
}
