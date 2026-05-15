package com.sourav.vector_share_backend.service;

import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.dto.request.UserRequestDto;
import com.sourav.vector_share_backend.dto.response.UserResponseDto;

@Service
public interface UserService {
	
	public UserResponseDto createUser(UserRequestDto userRequestDto);
	
	public UserResponseDto getUser(UserRequestDto userRequestDto);

}
