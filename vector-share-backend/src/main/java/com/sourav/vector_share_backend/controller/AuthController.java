package com.sourav.vector_share_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sourav.vector_share_backend.dto.request.AuthRequestDto;
import com.sourav.vector_share_backend.dto.request.RefreshTokenRequestDto;
import com.sourav.vector_share_backend.dto.request.ResetPasswordRequestDto;
import com.sourav.vector_share_backend.dto.request.SendOtpRequestDto;
import com.sourav.vector_share_backend.dto.request.UserRequestDto;
import com.sourav.vector_share_backend.dto.request.VerifyOtpRequestDto;
import com.sourav.vector_share_backend.dto.response.AuthResponseDto;
import com.sourav.vector_share_backend.dto.response.RefreshTokenResponseDto;
import com.sourav.vector_share_backend.security.AuthService;
import com.sourav.vector_share_backend.service.OtpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

	
	private final OtpService otpService;
	private final AuthService authService;
	
	@PostMapping("/send-otp")
	public ResponseEntity<String> sendOtp(@RequestBody @Valid SendOtpRequestDto request){
		
		otpService.sendOtp(request.getEmail());
		
		return ResponseEntity.status(HttpStatus.OK).body("OTP sent successfully");
	}
	
	@PostMapping("/verify-otp")
	public ResponseEntity<String> verifyOtp(@RequestBody @Valid VerifyOtpRequestDto request){
		
		otpService.verifyOtp(request.getEmail(), request.getOtp());
		
		return ResponseEntity.status(HttpStatus.OK).body("Email verified successfully");
	}

	@PostMapping("/register")
	public ResponseEntity<AuthResponseDto> register(@RequestBody @Valid UserRequestDto userRequestDto){
		AuthResponseDto user = authService.register(userRequestDto);
		return new ResponseEntity<AuthResponseDto>(user, HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponseDto> login(@RequestBody @Valid AuthRequestDto request){
		
		return ResponseEntity.ok(authService.login(request));
	
	}
	
	@PostMapping("/logout")
	public ResponseEntity<String> logout(){
		
		authService.logout();
		
		return ResponseEntity.ok("Logged out successfully");
	}
	
	@PostMapping("/refresh-token")
	public ResponseEntity<RefreshTokenResponseDto> refreshToken(@RequestBody @Valid RefreshTokenRequestDto request){
		System.out.println("Refresh Token called!");
		return ResponseEntity.status(HttpStatus.OK).body(authService.refreshToken(request));
	}
	
	@PostMapping("/forgot-password/send-otp")
	public ResponseEntity<String> sendPasswordResetOtp(@RequestBody @Valid SendOtpRequestDto request){
		
		authService.sendPasswordResetOtp(request.getEmail());
		
		return ResponseEntity.ok("Password reset OTP sent successfully");
	}

	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestBody @Valid ResetPasswordRequestDto request){
		
		authService.resetPassword(request);
		
		return ResponseEntity.ok("Password reset successfully");
	}
}
