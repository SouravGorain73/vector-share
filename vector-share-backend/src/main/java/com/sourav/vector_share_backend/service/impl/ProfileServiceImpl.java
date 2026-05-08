package com.sourav.vector_share_backend.service.impl;

import java.time.Instant;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.documents.ProfileDocument;
import com.sourav.vector_share_backend.dto.ProfileDto;
import com.sourav.vector_share_backend.repository.ProfileRepository;
import com.sourav.vector_share_backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService{
	
	private final ProfileRepository profileRepository;
	private final ModelMapper modelMapper;

	@Override
	public ProfileDto createProfile(ProfileDto profileDto) {
		
		ProfileDocument newProfile = ProfileDocument.builder()
				.clerkId(profileDto.getClerkId())
				.email(profileDto.getEmail())
				.firstName(profileDto.getFirstName())
				.lastName(profileDto.getLastName())
				.photoUrl(profileDto.getPhotoUrl())
				.credits(5)
				.createdAt(Instant.now())
				.build();
		
		newProfile = profileRepository.save(newProfile);
		
		return modelMapper.map(newProfile, ProfileDto.class);
	}

	@Override
	public ProfileDto updateProfile(String email, ProfileDto profileDto) {
		
		ProfileDocument oldProfile = profileRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User does not exists!"));
		
		if(profileDto.getClerkId() != null) {
			oldProfile.setClerkId(profileDto.getClerkId());
		}
		if(profileDto.getFirstName() != null) {
			oldProfile.setFirstName(profileDto.getFirstName());
		}
		if(profileDto.getLastName() != null) {
			oldProfile.setLastName(profileDto.getLastName());
		}
		if(profileDto.getEmail() != null) {
			oldProfile.setEmail(profileDto.getEmail());
		}
		if(profileDto.getPhotoUrl() != null) {
			oldProfile.setPhotoUrl(profileDto.getPhotoUrl());
		}
		
		
		ProfileDocument updatedProfile = profileRepository.save(oldProfile);
		
		return modelMapper.map(updatedProfile, ProfileDto.class);
		
	}

}
