package com.sourav.vector_share_backend.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.model.RefreshToken;
import com.sourav.vector_share_backend.model.User;
import com.sourav.vector_share_backend.repository.RefreshTokenRepository;
import com.sourav.vector_share_backend.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService{

	private final RefreshTokenRepository refreshTokenRepository;
	
	@Value("${jwt.refresh-token-expiration}")
	private Long refreshTokenDuration;

	@Override
	public RefreshToken createRefreshToken(User user) {
		
		RefreshToken refreshToken = refreshTokenRepository.findByUser(user).orElse(new RefreshToken());
		
		refreshToken.setRefreshToken(UUID.randomUUID().toString());
		refreshToken.setExpiryDate(LocalDateTime.now().plusSeconds(refreshTokenDuration / 1000));
		refreshToken.setUser(user);
		
		return refreshTokenRepository.save(refreshToken);
	}

	@Override
	public Optional<RefreshToken> findByRefreshToken(String token) {
		return refreshTokenRepository.findByRefreshToken(token);
	}

	@Override
	public RefreshToken vefiryExpiration(RefreshToken refreshToken) {

		if(refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
			refreshTokenRepository.delete(refreshToken);
			
			throw new RuntimeException("Refresh token expired!");
		}
		
		return refreshToken;
	}

	@Override
	public void deleteByUser(User user) {
		
		refreshTokenRepository.deleteByUser(user);
		
	}

	@Override
	public RefreshToken findValidRefreshToken(String token) {
		
		RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(token)
				.orElseThrow(() -> new RuntimeException("Invalid refresh token!"));
				
		return vefiryExpiration(refreshToken);
	}
}
