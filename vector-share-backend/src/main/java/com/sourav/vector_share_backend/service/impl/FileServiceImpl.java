package com.sourav.vector_share_backend.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sourav.vector_share_backend.dto.request.UpdateVisibilityDto;
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
		
		String shareToken = generateShareToken();
		
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
		
	    String contentType;

	    try {
	        contentType =
	                Files.probeContentType(			//detecting file MIME type(mainly determining the file type)
	                        Paths.get(
	                                storedFile
	                                .getFilePath()
	                        )
	                );
	    } catch (IOException e) {
	        contentType =
	                "application/octet-stream";		//Download the file if not getting it's file type
	    }
		
		return new FileDownloadDto(resource, storedFile.getOriginalFileName(), contentType);
	}

	@Override
	public List<FileResponseDto> getAllFilesByUser(Long userId) {
		
		List<StoredFile> files = fileRepository.findByUserId(userId);
		if(files == null) {
			throw new RuntimeException("User not found!");
		}
		
		return files.stream()
				.map(file -> {
					FileResponseDto dto = modelMapper.map(file, FileResponseDto.class);
					if(file.getShareToken() != null) {
						dto.setShareLink(
							baseUrl + "/share/" + file.getShareToken()
						);
					}
					return dto;
				})
				.toList();
	}
	
	public void deleteFile(Long fileId) {
		
		StoredFile storedFile = fileRepository.findById(fileId).orElseThrow(() -> new RuntimeException("File not found!"));
		
		//Delete the actual file
		storageService.deleteFile(
			storedFile.getFilePath()
		);
		
		//Delete the metadata form DB
		fileRepository.delete(storedFile);
	}

	@Override
	public FileResponseDto updateVisibility(Long fileId, UpdateVisibilityDto visibilityDto) {
		
		StoredFile file = fileRepository.findById(fileId).orElseThrow(() -> new RuntimeException("File not found!"));
		
		file.setVisibility(visibilityDto.getVisibility());
		
		 // Generate token only for PUBLIC files
	    if(file.getVisibility() == Visibility.PUBLIC && file.getShareToken() == null) {

	        file.setShareToken(
	                generateShareToken()
	        );
	    }
	    
		StoredFile updatedFile = fileRepository.save(file);

	    
		FileResponseDto fileDto = modelMapper.map(updatedFile, FileResponseDto.class);
		
		if(file.getVisibility() == Visibility.PUBLIC && updatedFile.getShareToken() != null) {	
			
			fileDto.setShareLink(baseUrl + "/share/" + file.getShareToken());
		}
		
		return fileDto;
	}
	
	private String generateShareToken() {
		return UUID.randomUUID().toString();
	}
}
