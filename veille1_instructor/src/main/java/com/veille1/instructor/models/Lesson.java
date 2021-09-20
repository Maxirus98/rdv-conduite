package com.veille1.instructor.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Unwrapped;

import java.util.Date;

@Data
@Document
public class Lesson {
    @Id
    private int id;
    private String Subject;
    private Date StartTime;
    private Date EndTime;

    //private Instructor instructor;
    private User[] users;
}
