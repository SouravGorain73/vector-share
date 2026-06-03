package com.sourav.vector_share_backend.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.dto.request.AuthRequestDto;
import com.sourav.vector_share_backend.dto.request.RefreshTokenRequestDto;
import com.sourav.vector_share_backend.dto.response.AuthResponseDto;
import com.sourav.vector_share_backend.dto.response.RefreshTokenResponseDto;
import com.sourav.vector_share_backend.model.RefreshToken;
import com.sourav.vector_share_backend.model.User;
import com.sourav.vector_share_backend.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;
	private final RefreshTokenService refreshTokenService;
	
	public AuthResponseDto login(AuthRequestDto loginRequest) {
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
		);
		
		CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
		
		String accessToken = jwtService.generateToken(userDetails);
		
		User user = userDetails.getUser();
		
		RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
		
		return new AuthResponseDto(accessToken, refreshToken.getRefreshToken());
	}
	
	public RefreshTokenResponseDto refreshToken(RefreshTokenRequestDto request) {
		
		RefreshToken refreshToken = refreshTokenService.findValidRefreshToken(request.getRefreshToken());
		
		User user = refreshToken.getUser();
		
		String accessToken = jwtService.generateToken(new CustomUserDetails(user));
		
		RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user);
		
		return new RefreshTokenResponseDto(accessToken, newRefreshToken.getRefreshToken());
	}
	
	public void logout() {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		
		refreshTokenService.deleteByUser(userDetails.getUser());
	}
}
