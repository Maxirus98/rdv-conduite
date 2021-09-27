package com.veille1.instructor;

import com.veille1.instructor.models.Instructor;
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
                .type(Users.STUDENT)
                .fullName("Brigitte Acom")
                .address("1111 rue Verdun")
                .phone("514-888-1111")
                .email("acom@hotmail.com")
                .build());
        users.add(User.builder()
                .id(334)
                .type(Users.STUDENT)
                .fullName("student student")
                .address("1111 rue student")
                .phone("514-888-2221")
                .email("student@hotmail.com")
                .build());
        return users;
    }

    public static List<Instructor> getAllInstructors() {
        List<Instructor> instructors = new ArrayList<>();
        instructors.add(Instructor.instructorBuilder()
                .id(333)
                .type(Users.INSTRUCTOR)
                .fullName("Brigitte Acom")
                .address("1111 rue Verdun")
                .phone("514-888-1111")
                .email("acom.bribri@hotmail.com")
                .manualDriver(false)
                .yearsOfExperience(3)
                .build());
        instructors.add(Instructor.instructorBuilder()
                .id(334)
                .type(Users.INSTRUCTOR)
                .fullName("Beatrice Acom")
                .address("4444 rue Dupuis")
                .phone("514-444-1234")
                .email("acom.bea@hotmail.com")
                .manualDriver(true)
                .yearsOfExperience(4)
                .build());
        return instructors;
    }

    public static List<Lesson> getAllLessons() {
        List<Lesson> lessons = new ArrayList<>();
        lessons.add(Lesson.builder()
                .id(333)
                .Subject("Module 3")
                .StartTime(new Date())
                .EndTime((new Date()))
                .instructor(getAllInstructors().get(0))
                .users(getAllUsers())
                .build()
        );
        lessons.add(Lesson.builder()
                .id(334)
                .Subject("Module 4")
                .StartTime(new Date())
                .EndTime((new Date()))
                .instructor(getAllInstructors().get(1))
                .users(getAllUsers())
                .build()
        );
        return lessons;
    }
}
