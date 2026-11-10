package com.sourav.vector_share_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sourav.vector_share_backend.service.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class MailTestController {

	private final EmailService emailService;
	
    @GetMapping("/send-mail")
    public String testMail(@RequestParam String email) {
        
    	try {
    		emailService.sendOtpEmail(email, "123456");
        	return "OTP send successfully.";
    	}
    	catch (Exception e) {
			return "Failed: " + e.getMessage();
		}
    }
}