package com.veille1.instructor.dto;


import com.veille1.instructor.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {

    private int id;
    private boolean isStudent;
    private String fullName;
    private String address;
    private String phone;
    private String email;

    public static UserDto entityToDto(User user) {
        return UserDto.builder().id(user.getId())
                .isStudent(user.isStudent())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .address(user.getAddress())
                .phone(user.getPhone())
                .build();
    }

    public static User dtoToEntity(UserDto userDto){
        return User.builder().id(userDto.getId())
                .isStudent(userDto.isStudent())
                .fullName(userDto.getFullName())
                .email(userDto.getEmail())
                .address(userDto.getAddress())
                .phone(userDto.getPhone())
                .build();
    }

}
