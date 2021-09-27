package com.veille1.instructor.dto;


import com.veille1.instructor.models.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class UserDto implements Serializable {

    private int id;
    private String fullName;
    private String address;
    private String phone;
    private String email;

    @Builder
    public UserDto(int id, String fullName, String address, String phone, String email) {
        this.id = id;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }

    public static UserDto entityToDto(User user) {
        return UserDto.builder().id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .address(user.getAddress())
                .phone(user.getPhone())
                .build();
    }

    public static User dtoToEntity(UserDto userDto){
        return User.builder().id(userDto.getId())
                .fullName(userDto.getFullName())
                .email(userDto.getEmail())
                .address(userDto.getAddress())
                .phone(userDto.getPhone())
                .build();
    }

}
