package com.sourav.vector_share_backend.service.impl;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EncryptionService {
	
	private static final String ALGORITHM = "AES";
	
	@Value("${encryption.secret-key}")
	private String SECRET_KEY;
	
	private SecretKeySpec getKeySpec() {
		return new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
	}
	
	public byte[] encrypt(byte[] data) {
		
		try {
			
//			byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
			
//			System.out.println(SECRET_KEY);

//			System.out.println(
//			    keyBytes.length
//			);
			
			Cipher cipher = Cipher.getInstance(ALGORITHM);
			
			cipher.init(Cipher.ENCRYPT_MODE, getKeySpec());
			
			return cipher.doFinal(data);
		}
		catch (Exception e) {
			throw new RuntimeException("Encryption failed!");
		}
		
	}
	
	public byte[] decrypt(byte[] encryptedData) {
		
		try {
			Cipher cipher = Cipher.getInstance(ALGORITHM);
			
			cipher.init(Cipher.DECRYPT_MODE, getKeySpec());
			
			return cipher.doFinal(encryptedData);
			
		} catch (Exception e) {
			throw new RuntimeException("Decryption failed!");
		}
	}

}
