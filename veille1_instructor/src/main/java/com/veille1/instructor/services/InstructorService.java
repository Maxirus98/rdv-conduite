package com.veille1.instructor.services;

import com.veille1.instructor.models.Instructor;
import com.veille1.instructor.repositories.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorService{
    @Autowired
    InstructorRepository instructorRepository;

    public Instructor saveInstructor(Instructor instructor){
        return instructorRepository.save(instructor);
    }

    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    public Instructor getInstructor(int id){
        return instructorRepository.findById(id);
    }

    public void deleteInstructor(int id) {
        instructorRepository.deleteById(id);
    }
}
