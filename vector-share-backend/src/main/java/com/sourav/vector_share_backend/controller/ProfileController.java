package com.sourav.vector_share_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sourav.vector_share_backend.dto.ProfileDto;
import com.sourav.vector_share_backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {
	
	private final ProfileService profileService;
	
	@PostMapping
	public ResponseEntity<ProfileDto> registerProfile(@RequestBody ProfileDto profileDto){
		ProfileDto newProfile = profileService.createProfile(profileDto);
		return new ResponseEntity<>(newProfile, HttpStatus.CREATED);
	}
}
