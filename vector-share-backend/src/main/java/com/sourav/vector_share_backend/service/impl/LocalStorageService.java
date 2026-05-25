package com.sourav.vector_share_backend.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sourav.vector_share_backend.service.StorageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocalStorageService implements StorageService{
	
	private final String UPLOAD_DIR = "uploads/";
	private final EncryptionService encryptionService;

	@Override
	public String saveFile(MultipartFile file, String fileName) {
		
		try {
			
			Path path = Paths.get(UPLOAD_DIR, fileName);
			
//			Files.copy(file.getInputStream(), path);	//Directly saving the file
			
			//Encrypting the file first then  store
			
			byte[] fileBytes = file.getBytes();
			
			byte[] encryptedBytes = encryptionService.encrypt(fileBytes);
			
			Files.write(path, encryptedBytes);
			
			return path.toString();
			
		} catch (IOException e) {
			
			throw new RuntimeException("File upload failed!");
			
		}
		
	}

	@Override
	public Resource loadFile(String path) {
		try {
			Path filePath = Paths.get(path);
			
//			Resource resource = new UrlResource(filePath.toUri());	//Loading the file which is stored directly not encrypted
			
			//How to load a file form encrypted bytes
			
			//Step1: Read the encrypted bytes
			byte[] encryptedBytes = Files.readAllBytes(filePath);
			
			//Step2: Decrypt the bytes
			byte[] decryptedBytes = encryptionService.decrypt(encryptedBytes);
			
			//Step3: Return the decrypted bytes
			return new ByteArrayResource(decryptedBytes);
			
			
		} catch (IOException e) {
			throw new RuntimeException("File not found!");
		}
	}

	@Override
	public void deleteFile(String path) {
		
		try {
			Path filePath = Paths.get(path);
			
			Files.deleteIfExists(filePath);
		}
		catch(IOException e) {
			throw new RuntimeException("Failed to delete file!");
		}
	}
}
