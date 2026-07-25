package com.sourav.vector_share_backend.service;


public interface EmailService {

	void sendOtpEmail(String to, String otp);
	
}
