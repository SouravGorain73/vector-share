package com.sourav.vector_share_backend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name ="email_verifications")
public class EmailVerification{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Email(message = "email is not valid")
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false)
	private String otp;
	
	@Column(nullable = false)
	private LocalDateTime expiryTime;
	
	private boolean verified;
	
	private Integer attempts = 0;
	
	private LocalDateTime lastOtpSentAt;
	
	@CreationTimestamp
	private LocalDateTime createdAt;
	
	public EmailVerification(String email) {
		this.email = email;
	}

}
