package com.sourav.vector_share_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sourav.vector_share_backend.service.OtpService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final OtpService otpService;
	
	@GetMapping("/send-otp")
	public ResponseEntity<String> sendTestEmail(@RequestParam String email) {
		
		otpService.sendOtp(email);
		
		return ResponseEntity.status(HttpStatus.OK).body("Email sent");
	}
}
