package com.veille1.instructor.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document("users")
public class User {
    @Id
    private int id;
    private boolean isStudent;
    private String fullName;
    private String address;
    private String phone;
    private String email;

    @Builder
    public User(int id,
                      boolean isStudent,
                      String fullName,
                      String address,
                      String phone,
                      String email){
        this.id = id;
        this.isStudent = isStudent;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}
