package com.veille1.instructor.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Instructor extends User{
    private boolean manualDriver;
    private int yearsOfExperience;

}
