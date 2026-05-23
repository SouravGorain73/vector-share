package com.sourav.vector_share_backend.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponseDto {
	
	private String message;
	private int status;
	private LocalDateTime timeStamp;
	
}
