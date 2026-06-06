package com.sourav.vector_share_backend.service.impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.sourav.vector_share_backend.model.EmailVerification;
import com.sourav.vector_share_backend.security.EmailVerificationRepository;
import com.sourav.vector_share_backend.service.EmailService;
import com.sourav.vector_share_backend.service.OtpService;
import com.sourav.vector_share_backend.util.OtpGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService{
	
	private final EmailVerificationRepository emailVerificationRepository;
	private final EmailService emailService;

	@Override
	public void sendOtp(String email) {
			
		EmailVerification verification = emailVerificationRepository.findByEmail(email).orElse(new EmailVerification(email));
		
		if(verification.getId() != null) {
			validateOtpCooldown(verification);
		}

		String otp = OtpGenerator.generateOtp();
		verification.setOtp(otp);
		verification.setVerified(false);
		verification.setExpiryTime(LocalDateTime.now().plusMinutes(5));
		verification.setAttempts(0);
		verification.setLastOtpSentAt(LocalDateTime.now());
		

		
		emailVerificationRepository.save(verification);
		
		emailService.sendEmail(
				email,
				"Verify Your Email - Vector Share",
				"Your OTP is: " + otp + "\nValid for 5 minutes."
		);
	}

	@Override
	public boolean verifyOtp(String email, String otp) {
		
		EmailVerification verification = emailVerificationRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("OTP not found!"));
		
		if(verification.isVerified()) {
			throw new RuntimeException("Email already verified");
		}
		
		if(LocalDateTime.now().isAfter(verification.getExpiryTime())){
			throw new RuntimeException("OTP expired!");
		}
		
		if(verification.getAttempts() >= 5) {
			throw new RuntimeException("Maximum OTP attempts exceeded!");
		}
		
		if(!verification.getOtp().equals(otp)) {
			
			verification.setAttempts(verification.getAttempts() + 1);
			
			emailVerificationRepository.save(verification);
			
			throw new RuntimeException("Invalid OTP");
		}
		
		verification.setVerified(true);
		emailVerificationRepository.save(verification);
		return true;
	}

	@Override
	public void resendOtp(String email) {
	
		sendOtp(email);
	}

	private void validateOtpCooldown(EmailVerification verification) {
		
		if(verification.getLastOtpSentAt().plusSeconds(30).isAfter(LocalDateTime.now())) {
			throw new RuntimeException("Please wait 30 seconds before requesting another OTP");
		}
	}
	
}
