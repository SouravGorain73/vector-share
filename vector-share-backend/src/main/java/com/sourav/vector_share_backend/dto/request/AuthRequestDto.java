package com.sourav.vector_share_backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthRequestDto {

	@Email(message = "Invalid email format!")
	@NotBlank(message = "Email is required!")
	private String email;
	
	@NotBlank(message = "Password is required!")
	@Size(min = 6, message = "Password must be atleast 6 characters!")
	private String password;
	
}
