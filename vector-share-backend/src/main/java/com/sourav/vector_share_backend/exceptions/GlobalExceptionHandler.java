package com.sourav.vector_share_backend.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.sourav.vector_share_backend.dto.response.ErrorResponseDto;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponseDto> handleResourceNotFoundException(ResourceNotFoundException ex){
		
		ErrorResponseDto response = new ErrorResponseDto(ex.getMessage(), HttpStatus.NOT_FOUND.value(), LocalDateTime.now());
		
		return new ResponseEntity<ErrorResponseDto>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(UnauthorizedAccessException.class)
	public ResponseEntity<ErrorResponseDto> handleUnauthorizedAccessexception(UnauthorizedAccessException ex){
		
		ErrorResponseDto response = new ErrorResponseDto(ex.getMessage(), HttpStatus.FORBIDDEN.value(), LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	}
	
	//handling other general exceptions
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponseDto> handleGenericException(Exception ex){
		
		ErrorResponseDto response = new ErrorResponseDto(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}
}
