package com.sourav.vector_share_backend.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService{
	

	private final String sender;
	private final JavaMailSender mailSender;
	
	 public EmailServiceImpl(
			 JavaMailSender mailSender,
			 @Value("${spring.mail.username}") String sender) {
		 this.mailSender = mailSender;
		 this.sender = sender;
	 }

	@Override
	public void sendEmail(String to, String subject, String body) {
		
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setTo(to);
		message.setFrom(sender);
		message.setSubject(subject);
		message.setText(body);
		
		mailSender.send(message);
		
	}

}
