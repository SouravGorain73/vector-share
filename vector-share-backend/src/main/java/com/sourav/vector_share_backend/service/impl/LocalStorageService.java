package com.sourav.vector_share_backend.service.impl;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sourav.vector_share_backend.service.StorageService;

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

	@Override
	public Resource loadFile(String path) {
		try {
			Path filePath = Paths.get(path);
			
			Resource resource = new UrlResource(filePath.toUri());
			
			if(resource.exists()) {
				return resource;
			}
			else {
				throw new RuntimeException("File not found!");
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("File not found!");
		}
	}
}
