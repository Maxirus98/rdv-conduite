package com.veille1.instructor.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document
public class Instructor extends User{
    private boolean manualDriver;
    private int yearsOfExperience;

    @Builder(builderMethodName = "instructorBuilder")
    public Instructor(int id,
                      Users type,
                      String fullName,
                      String address,
                      String phone,
                      String email,
                      boolean manualDriver,
                      int yearsOfExperience){
        super(id, type, fullName, address, phone, email);
        this.manualDriver = manualDriver;
        this.yearsOfExperience = yearsOfExperience;
    }
}
