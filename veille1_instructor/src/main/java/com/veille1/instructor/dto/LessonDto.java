package com.veille1.instructor.dto;
import com.veille1.instructor.models.Lesson;
import com.veille1.instructor.models.User;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class LessonDto implements Serializable {

    private int id;
    private String Subject;
    private Date StartTime;
    private Date EndTime;

    private List<User> users;

    @Builder
    public LessonDto(int id, String subject, Date startTime, Date endTime, List<User> users) {
        this.id = id;
        Subject = subject;
        StartTime = startTime;
        EndTime = endTime;
        this.users = users;
    }

    public static LessonDto entityToDto(Lesson lesson) {
        return LessonDto.builder().id(lesson.getId())
                .subject(lesson.getSubject())
                .startTime(lesson.getStartTime())
                .endTime(lesson.getEndTime())
                .users(lesson.getUsers())
                .build();
    }

    public static Lesson dtoToEntity(LessonDto lessonDto){
        return Lesson.builder().id(lessonDto.getId())
                .subject(lessonDto.getSubject())
                .startTime(lessonDto.getStartTime())
                .endTime(lessonDto.getEndTime())
                .users(lessonDto.getUsers())
                .build();
    }
}
