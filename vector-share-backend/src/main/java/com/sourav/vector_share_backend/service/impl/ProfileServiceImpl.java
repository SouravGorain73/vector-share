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

}
