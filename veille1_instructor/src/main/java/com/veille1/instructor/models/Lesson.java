package com.veille1.instructor.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document
public class Lesson {
    @Id
    private int id;
    private String descriptif;
    private Date date;

    /*private Instructor instructor;
    private User[] students;*/
}
