package com.sourav.vector_share_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sourav.vector_share_backend.dto.response.FileDownloadDto;
import com.sourav.vector_share_backend.dto.response.FileResponseDto;
import com.sourav.vector_share_backend.enums.Visibility;

@Service
public interface FileService {
	
	public FileResponseDto uploadNewFile(MultipartFile file, Visibility visibility, Long userId);
	
	public FileDownloadDto getSharedFile(String token);

}
