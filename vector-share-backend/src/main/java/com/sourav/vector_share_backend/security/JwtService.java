package com.sourav.vector_share_backend.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	@Value("${jwt.secret-key}")
	private String jwtSecretKey;
	
	public String generateToken(User user) {
		
		Map<String, Object> claims = new HashMap<>();
		
		claims.put("userId", user.getId());
		
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(user.getEmail())
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 1000*60*10))
				.signWith(getSigningKey())
				.compact();
	}
	
	private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
	}
}
