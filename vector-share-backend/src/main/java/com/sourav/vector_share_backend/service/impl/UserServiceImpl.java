package com.sourav.vector_share_backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.dto.request.ResetPasswordRequestDto;
import com.sourav.vector_share_backend.dto.request.UserRequestDto;
import com.sourav.vector_share_backend.dto.response.UserResponseDto;
import com.sourav.vector_share_backend.model.User;
import com.sourav.vector_share_backend.repository.UserRepository;
import com.sourav.vector_share_backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public User createUser(UserRequestDto userDto) {
		if(existsByEmail(userDto.getEmail())) {
			throw new RuntimeException("Email already registered!");
		}
		User newUser = User.builder()
				.name(userDto.getName())
				.email(userDto.getEmail())
				.password(passwordEncoder.encode(userDto.getPassword()))
				.build();
		newUser = userRepository.save(newUser);
		
		return newUser;
	}

	@Override
	public UserResponseDto getUser(String email){
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Email id is not registered!"));
		return modelMapper.map(user, UserResponseDto.class);
		
	}
	
	@Override
	public void updatePassword(ResetPasswordRequestDto request) {
		
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found!"));
		
		user.setPassword(passwordEncoder.encode(request.getNewPassword()));
		
		userRepository.save(user);
	}
	
	@Override
	public boolean existsByEmail(String email) {
		return userRepository.existsByEmail(email);
	}
	
}
