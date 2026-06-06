package com.sourav.vector_share_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sourav.vector_share_backend.dto.response.UserResponseDto;
import com.sourav.vector_share_backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	@GetMapping("/{email}")
	public ResponseEntity<UserResponseDto> getUser(@PathVariable String email){
		UserResponseDto user = userService.getUser(email);
		return new ResponseEntity<UserResponseDto>(user, HttpStatus.OK);
	}
	

}
