package com.sourav.vector_share_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface StorageService {
	String saveFile(MultipartFile file, String fileName);
}
