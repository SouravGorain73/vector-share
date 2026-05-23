package com.sourav.vector_share_backend.exceptions;

@SuppressWarnings("serial")
public class UnauthorizedAccessException extends RuntimeException{

	public UnauthorizedAccessException(String message) {
		super(message);
	}
}
