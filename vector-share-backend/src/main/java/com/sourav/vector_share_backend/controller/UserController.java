package com.sourav.vector_share_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sourav.vector_share_backend.dto.request.UserRequestDto;
import com.sourav.vector_share_backend.dto.response.UserResponseDto;
import com.sourav.vector_share_backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	@PostMapping("/create")
	public ResponseEntity<UserResponseDto> registerUser(@RequestBody UserRequestDto userRequestDto){
		UserResponseDto user = userService.createUser(userRequestDto);
		return new ResponseEntity<UserResponseDto>(user, HttpStatus.CREATED);
	}
	
	@GetMapping("/get")
	public ResponseEntity<UserResponseDto> getUser(@RequestBody UserRequestDto userRequestDto){
		UserResponseDto user = userService.getUser(userRequestDto);
		return new ResponseEntity<UserResponseDto>(user, HttpStatus.OK);
	}

}
