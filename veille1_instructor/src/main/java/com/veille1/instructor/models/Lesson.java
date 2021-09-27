package com.veille1.instructor.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Lesson {
    @Id
    private int id;
    private String subject;
    private Date startTime;
    private Date endTime;

    private List<User> users;
}
