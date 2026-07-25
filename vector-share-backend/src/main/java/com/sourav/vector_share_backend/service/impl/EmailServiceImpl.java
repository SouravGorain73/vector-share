package com.sourav.vector_share_backend.service.impl;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.service.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

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
	public void sendOtpEmail(String to, String otp){
		
		try {
			MimeMessage message = mailSender.createMimeMessage();
			
			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, "UTF-8");
			
			String html = loadTemplate("otp-email.html");
			html = html.replace("{{OTP}}", otp);
			
			helper.setTo(to);
			helper.setFrom(sender);
			helper.setSubject("Verify your email address • Vector Share");
			helper.setText(html, true);
			
			//Attach the logo
			helper.addInline("logo", new ClassPathResource("static/images/logo.png"));
			
			mailSender.send(message);
		}
		catch(MessagingException e) {
			throw new RuntimeException("Failed to send OTP email", e);
		}
		
	}
	
	private String loadTemplate(String filename) {
		
		try {
			ClassPathResource resource = new ClassPathResource("templates/" + filename);
			
			return new String(
					resource.getInputStream().readAllBytes(),
					StandardCharsets.UTF_8);
		}
		catch(IOException e) {
			throw new RuntimeException("Unable to load email template", e);
		}
	}

}
