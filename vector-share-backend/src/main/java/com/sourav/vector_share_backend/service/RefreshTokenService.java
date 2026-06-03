package com.sourav.vector_share_backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.model.RefreshToken;
import com.sourav.vector_share_backend.model.User;

@Service
public interface RefreshTokenService {
	
	RefreshToken createRefreshToken(User user);
	
	Optional<RefreshToken> findByRefreshToken(String token);
	
	RefreshToken vefiryExpiration(RefreshToken refreshToken);
	
	void deleteByUser(User user);
	
	RefreshToken findValidRefreshToken(String token);

}
