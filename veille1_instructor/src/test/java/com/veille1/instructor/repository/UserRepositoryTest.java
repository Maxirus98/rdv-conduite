package com.veille1.instructor.repository;

import com.veille1.instructor.models.User;
import com.veille1.instructor.models.Users;
import com.veille1.instructor.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
@ExtendWith(SpringExtension.class)
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    void findByIdTest(){
        // Arrange
        Integer id = 1;

        // Act
        Optional<User> user = userRepository.findById(id);

        // Assert
        assertEquals(id, user.get().getId());
    }

    @Test
    void saveUserTest(){
        // Arrange
        User user = new User(33,
                Users.INSTRUCTOR,
                "Brigitte Acom",
                "2525 rue verdun, h4h 3a1",
                "514-508-8888",
                "acom@hotmail.com");
        // Act
        User savedUser = userRepository.save(user);

        // Assert
        assertNotNull(userRepository.findById(savedUser.getId()));

        // Cleanup
        userRepository.delete(savedUser);
    }

    private List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        users.add(User.builder()
                .id(1)
                .type(Users.INSTRUCTOR)
                .fullName("Brigitte Acom")
                .address("1111 rue Verdun")
                .phone("514-888-1111")
                .email("acom@hotmail.com")
                .build());
        users.add(User.builder()
                .id(2)
                .type(Users.STUDENT)
                .fullName("student student")
                .address("1111 rue student")
                .phone("514-888-2221")
                .email("student@hotmail.com")
                .build());
        return users;
    }
}
