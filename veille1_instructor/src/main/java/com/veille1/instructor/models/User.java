package com.veille1.instructor.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("Student")
public class User {
    @Id
    private int id;
    private String name;
    private String surname;
    private String address;
    private String phone;
    private String email;
}
