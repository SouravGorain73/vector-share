package com.sourav.vector_share_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthRequestDto {

	private String email;
	
	private String password;
	
}
