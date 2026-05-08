package com.sourav.vector_share_backend.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(DuplicateKeyException.class)
	public ResponseEntity<?> handleDuplicateUserCreation(DuplicateKeyException e){
		Map<String, Object> data = new HashMap<>();
		data.put("status", HttpStatus.CONFLICT);
		data.put("message", e.getMessage());
		return new ResponseEntity<>(data, HttpStatus.CONFLICT);
	}
}
