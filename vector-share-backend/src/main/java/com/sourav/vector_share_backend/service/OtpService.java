package com.sourav.vector_share_backend.service;

import org.springframework.stereotype.Service;

@Service
public interface OtpService {

	void sendOtp(String email);
	
	boolean verifyOtp(String email, String otp);
	
	void resendOtp(String email);
}
