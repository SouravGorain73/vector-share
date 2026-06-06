package com.sourav.vector_share_backend.service;


public interface EmailService {

	void sendEmail(String to, String subject, String body);
	
}
