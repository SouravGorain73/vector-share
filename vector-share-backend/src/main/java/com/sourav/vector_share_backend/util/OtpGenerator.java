package com.sourav.vector_share_backend.util;

import java.security.SecureRandom;

public class OtpGenerator {
	
	private static final SecureRandom random = new SecureRandom();
	
	public static String generateOtp() {
		return String.valueOf(100000 + random.nextInt(900000));
	}

}
