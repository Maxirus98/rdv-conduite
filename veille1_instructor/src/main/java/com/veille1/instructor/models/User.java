package com.veille1.instructor.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document("Student")
public class User {
    @Id
    protected int id;
    protected Users type;
    protected String fullName;
    protected String address;
    protected String phone;
    protected String email;

    @Builder
    public User(int id,
                      Users type,
                      String fullName,
                      String address,
                      String phone,
                      String email){
        this.id = id;
        this.type = type;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}
