package com.sourav.vector_share_backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class LocalStorageService implements StorageService{
	
	private final String UPLOAD_DIR = "uploads/";

	@Override
	public String saveFile(MultipartFile file, String fileName) {
		
		try {
			
			Path path = Paths.get(UPLOAD_DIR, fileName);
			Files.copy(file.getInputStream(), path);
			
			return path.toString();
			
		} catch (IOException e) {
			
			throw new RuntimeException("File upload failed!");
			
		}
		
	}
}
