package com.sourav.vector_share_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sourav.vector_share_backend.dto.request.AuthRequestDto;
import com.sourav.vector_share_backend.dto.request.RefreshTokenRequestDto;
import com.sourav.vector_share_backend.dto.request.UserRequestDto;
import com.sourav.vector_share_backend.dto.response.AuthResponseDto;
import com.sourav.vector_share_backend.dto.response.RefreshTokenResponseDto;
import com.sourav.vector_share_backend.dto.response.UserResponseDto;
import com.sourav.vector_share_backend.security.AuthService;
import com.sourav.vector_share_backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthService authService;
	private final UserService userService;

	@PostMapping("/register")
	public ResponseEntity<UserResponseDto> registerUser(@RequestBody @Valid UserRequestDto userRequestDto){
		UserResponseDto user = userService.createUser(userRequestDto);
		return new ResponseEntity<UserResponseDto>(user, HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponseDto> login(@RequestBody @Valid AuthRequestDto request){
		
		return ResponseEntity.ok(authService.login(request));
	
	}
	
	@PostMapping("/logout")
	public ResponseEntity<String> logout(){
		
		authService.logout();
		
		return ResponseEntity.ok("Logged out successfully");
	}
	
	@PostMapping("/refresh-token")
	public ResponseEntity<RefreshTokenResponseDto> refreshToken(@RequestBody @Valid RefreshTokenRequestDto request){
		System.out.println("Refresh Token called!");
		return ResponseEntity.status(HttpStatus.OK).body(authService.refreshToken(request));
	}

}
