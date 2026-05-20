package com.sourav.vector_share_backend.service.impl;

import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sourav.vector_share_backend.dto.response.FileDownloadDto;
import com.sourav.vector_share_backend.dto.response.FileResponseDto;
import com.sourav.vector_share_backend.enums.Visibility;
import com.sourav.vector_share_backend.model.StoredFile;
import com.sourav.vector_share_backend.model.User;
import com.sourav.vector_share_backend.repository.FileRepository;
import com.sourav.vector_share_backend.repository.UserRepository;
import com.sourav.vector_share_backend.service.FileService;
import com.sourav.vector_share_backend.service.StorageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{
	
	private final StorageService storageService;
	private final FileRepository fileRepository;
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	
	@Value("${app.base-url}")
	private String baseUrl;

	@Override
	public FileResponseDto uploadNewFile(MultipartFile file, Visibility visibility, Long userId) {
		
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found!"));
		
		//Generate unique filename
		String storedFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
		
		//Save the file physically
		String filePath = storageService.saveFile(file, storedFileName);
		
		String shareToken = UUID.randomUUID().toString();
		
		StoredFile storedFile = StoredFile.builder()
				.originalFileName(file.getOriginalFilename())
				.storedFileName(storedFileName)
				.filePath(filePath)
				.fileSize(file.getSize())
				.visibility(visibility)
				.shareToken(shareToken)
				.user(user)
				.build();
		
		//Save metadata in db
		StoredFile savedFile = fileRepository.save(storedFile);
		
		FileResponseDto fileResponseDto = modelMapper.map(savedFile, FileResponseDto.class);
		fileResponseDto.setShareLink(
				baseUrl + "/share/" + shareToken
			);
		
		return fileResponseDto;
		
	}

	@Override
	public FileDownloadDto getSharedFile(String token) {
		
		StoredFile storedFile = fileRepository.findByShareToken(token).orElseThrow(() -> new RuntimeException("File not available!"));
		
		if(storedFile.getVisibility() == Visibility.PRIVATE){
			throw new RuntimeException("Access denied!");
		}
		
		Resource resource = storageService.loadFile(storedFile.getFilePath());
		
		return new FileDownloadDto(resource, storedFile.getOriginalFileName());
	}

}
