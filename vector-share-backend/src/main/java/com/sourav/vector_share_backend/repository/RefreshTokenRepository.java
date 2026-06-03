package com.sourav.vector_share_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sourav.vector_share_backend.model.RefreshToken;
import com.sourav.vector_share_backend.model.User;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>{

	Optional<RefreshToken> findByRefreshToken(String token);
	
	long deleteByUser(User user);
	
}
