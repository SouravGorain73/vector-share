package com.sourav.vector_share_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RefreshTokenResponseDto {

	private String accessToken;
	private String refreshToken;
}
