package com.veille1.instructor;

import com.veille1.instructor.models.User;
import com.veille1.instructor.models.Users;
import com.veille1.instructor.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class InserterRunner implements ApplicationRunner {
    @Autowired
    UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        userRepository.deleteById(1);
        userRepository.deleteById(2);
        userRepository.deleteById(3);
        userRepository.deleteById(4);
        userRepository.deleteById(5);

        insertUsers();
    }

    private void insertUsers() {
        List<User> users = Arrays.asList(
                User.builder()
                        .id(1)
                        .isStudent(false)
                        .fullName("Mario Lemieux")
                        .address("1111 rue Lapierre")
                        .phone("514-111-2222")
                        .email("mario.lemieux@gmail.com")
                        .build(),
                User.builder()
                        .id(2)
                        .isStudent(true)
                        .fullName("Manon Birron")
                        .address("2222 rue Verdun")
                        .phone("514-222-1111")
                        .email("manon.biron@hotmail.com")
                        .build(),
                User.builder()
                        .id(3)
                        .isStudent(true)
                        .fullName("Tony Yu")
                        .address("3333 rue Masson")
                        .phone("514-333-2244")
                        .email("yutony@gmail.com")
                        .build(),
                User.builder()
                        .id(4)
                        .isStudent(true)
                        .fullName("Henry Morse")
                        .address("4444 rue Dupuis")
                        .phone("514-444-3333")
                        .email("gorsea@gmail.com")
                        .build(),
                User.builder()
                        .id(5)
                        .isStudent(false)
                        .fullName("Trésor Ngalani")
                        .address("5555 rue Baudelaire")
                        .phone("514-555-4444")
                        .email("tresor.ngalani@outlook.com")
                        .build()
        );

        userRepository.saveAll(users);
    }
}
