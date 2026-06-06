package com.sourav.vector_share_backend.service;

import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.dto.request.ResetPasswordRequestDto;
import com.sourav.vector_share_backend.dto.request.UserRequestDto;
import com.sourav.vector_share_backend.dto.response.UserResponseDto;

@Service
public interface UserService {
	
	public UserResponseDto createUser(UserRequestDto userRequestDto);
	
	public UserResponseDto getUser(String email);

	public void updatePassword(ResetPasswordRequestDto request);
	
	public boolean existsByEmail(String email);
}
