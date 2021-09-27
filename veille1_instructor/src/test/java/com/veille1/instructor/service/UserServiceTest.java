package com.veille1.instructor.service;

import com.veille1.instructor.MockData;
import com.veille1.instructor.models.User;
import com.veille1.instructor.repositories.UserRepository;
import com.veille1.instructor.services.LessonService;
import com.veille1.instructor.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @Test
    void getAllUsers() {
        // Arrange
        when(userRepository.findAll()).thenReturn(MockData.getAllUsers());

        // Act
        List<User> serviceUsers = userService.getAllUsers();

        // Assert
        assertThat(serviceUsers.size()).isEqualTo(2);
    }

    @Test
    void getUser() {
        // Arrange
        Integer id = 333;
        User user = MockData.getAllUsers().get(0);
        when(userRepository.findById(user.getId())).thenReturn(user);

        // Act
        User serviceUser = userService.getUser(id);

        // Assert
        assertThat(serviceUser.getId()).isEqualTo(id);
    }

    @Test
    void saveUser() {
        // Arrange
        User user = MockData.getAllUsers().get(0);
        when(userRepository.save(user)).thenReturn(user);

        // Act
        User serviceUser = userService.saveUser(user);

        // Assert
        assertEquals(user, serviceUser);
    }

    @Test
    void deleteUser(){
        // Arrange
        User user = MockData.getAllUsers().get(0);

        // Act
        userService.deleteUser(user.getId());

        // Assert
        verify(userRepository, times(1)).deleteById(user.getId());
    }
}
