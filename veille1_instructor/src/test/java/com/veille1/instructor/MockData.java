package com.veille1.instructor;

import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.models.User;
import com.veille1.instructor.models.Users;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MockData {

    public static List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        users.add(User.builder()
                .id(333)
                .isStudent(false)
                .fullName("Brigitte Acom")
                .address("1111 rue Verdun")
                .phone("514-888-1111")
                .email("acom@hotmail.com")
                .build());
        users.add(User.builder()
                .id(334)
                .isStudent(true)
                .fullName("student student")
                .address("1111 rue student")
                .phone("514-888-2221")
                .email("student@hotmail.com")
                .build());
        return users;
    }

    public static List<Lesson> getAllLessons() {
        List<Lesson> lessons = new ArrayList<>();
        lessons.add(Lesson.builder()
                .id(333)
                .subject("Module 3")
                .startTime(new Date())
                .endTime((new Date()))
                .users(getAllUsers())
                .build()
        );
        lessons.add(Lesson.builder()
                .id(334)
                .subject("Module 4")
                .startTime(new Date())
                .endTime((new Date()))
                .users(getAllUsers())
                .build()
        );
        return lessons;
    }
}
