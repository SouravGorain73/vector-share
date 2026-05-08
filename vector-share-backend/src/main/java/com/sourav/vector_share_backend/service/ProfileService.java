package com.sourav.vector_share_backend.service;

import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.dto.ProfileDto;

@Service
public interface ProfileService {
	
	ProfileDto createProfile(ProfileDto profileDto);
	
	ProfileDto updateProfile(String email, ProfileDto profileDto);

}
