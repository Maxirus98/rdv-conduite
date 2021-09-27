package com.veille1.instructor.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.veille1.instructor.MockData;
import com.veille1.instructor.controllers.UserController;
import com.veille1.instructor.models.User;
import com.veille1.instructor.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @MockBean
    UserService userService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAllUsersTest() throws Exception {
        // Arrange
        List<User> users = MockData.getAllUsers();
        when(userService.getAllUsers()).thenReturn(users);

        // Act
        MvcResult result = mockMvc.perform(get("/user/all")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        // Assert
        var actuals = new ObjectMapper()
                .readValue(result.getResponse().getContentAsString(), List.class);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
    }

    @Test
    void getUserTest() throws Exception {
        // Arrange
        Integer id = 333;
        User user = MockData.getAllUsers().get(0);
        when(userService.getUser(user.getId())).thenReturn(user);

        // Act
        MvcResult result = mockMvc.perform((get("/user?id="+id)
            .contentType(MediaType.APPLICATION_JSON)))
                .andReturn();

        // Assert
        var actuals = new ObjectMapper()
                .readValue(result.getResponse().getContentAsString(), User.class);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.getId()).isEqualTo(user.getId());
    }

    @Test
    void saveUserTest() throws Exception {
        // Arrange
        User user = MockData.getAllUsers().get(0);
        when(userService.saveUser(user)).thenReturn(user);

        //Act
        MvcResult result = mockMvc.perform(post("/user/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(user)))
                .andReturn();

        // Assert
        var actuals = new ObjectMapper()
                .readValue(result.getResponse().getContentAsString(), User.class);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals).isEqualTo(user);
    }

    @Test
    void deleteUser(){
        // Arrange
        User user = MockData.getAllUsers().get(0);

        // Act
        userService.saveUser(user);
        userService.deleteUser(user.getId());

        // Assert
        assertThat(userService.getUser(user.getId())).isEqualTo(null);
        verify(userService, times(1)).deleteUser(user.getId());
    }
}
