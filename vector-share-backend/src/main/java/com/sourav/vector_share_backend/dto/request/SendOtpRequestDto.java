package com.sourav.vector_share_backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SendOtpRequestDto {
	
	@Email(message = "Invalid email format")
	@NotBlank(message = "Email can't be blank")
	private String email;

}
