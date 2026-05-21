package com.sourav.vector_share_backend.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.model.User;
import com.sourav.vector_share_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{
	
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
		
		 return org.springframework.security
	                .core.userdetails.User
	                .builder()
	                .username(user.getEmail())
	                .password(user.getPassword())
	                .build();
	}

}
