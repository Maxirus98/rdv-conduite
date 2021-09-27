package com.veille1.instructor.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.veille1.instructor.MockData;
import com.veille1.instructor.controllers.InstructorController;
import com.veille1.instructor.models.Instructor;
import com.veille1.instructor.models.User;
import com.veille1.instructor.services.InstructorService;
import com.veille1.instructor.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(InstructorController.class)
public class InstructorControllerTest {

    @MockBean
    InstructorService instructorService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAllInstructorsTest() throws Exception {
        // Arrange
        List<Instructor> instructors = MockData.getAllInstructors();
        when(instructorService.getAllInstructors()).thenReturn(instructors);

        // Act
        MvcResult result = mockMvc.perform(get("/instructor/all")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        // Assert
        var actuals = new ObjectMapper()
                .readValue(result.getResponse().getContentAsString(), List.class);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
    }

    @Test
    void getInstructorTest() throws Exception {
        // Arrange
        Integer id = 333;
        Instructor instructor = MockData.getAllInstructors().get(0);
        when(instructorService.getInstructor(instructor.getId())).thenReturn(instructor);

        // Act
        MvcResult result = mockMvc.perform((get("/instructor?id="+id)
            .contentType(MediaType.APPLICATION_JSON)))
                .andReturn();

        // Assert
        var actuals = new ObjectMapper()
                .readValue(result.getResponse().getContentAsString(), Instructor.class);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.getId()).isEqualTo(instructor.getId());
    }

    @Test
    void saveInstructorTest() throws Exception {
        // Arrange
        Instructor instructor = MockData.getAllInstructors().get(0);
        when(instructorService.saveInstructor(instructor)).thenReturn(instructor);

        //Act
        MvcResult result = mockMvc.perform(post("/instructor/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(instructor)))
                .andReturn();

        // Assert
        var actuals = new ObjectMapper()
                .readValue(result.getResponse().getContentAsString(), Instructor.class);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals).isEqualTo(instructor);


    }
}
