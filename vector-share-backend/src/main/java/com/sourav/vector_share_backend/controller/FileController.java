package com.sourav.vector_share_backend.controller;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sourav.vector_share_backend.dto.request.UpdateVisibilityDto;
import com.sourav.vector_share_backend.dto.response.FileDownloadDto;
import com.sourav.vector_share_backend.dto.response.FileResponseDto;
import com.sourav.vector_share_backend.enums.Visibility;
import com.sourav.vector_share_backend.service.FileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {
	
	private final FileService fileService;
	
	@PostMapping("/upload")
	public ResponseEntity<FileResponseDto> uploadNewFile(@RequestParam MultipartFile file, @RequestParam Visibility visibility, @RequestParam Long userId){
		
		FileResponseDto uploadedFile = fileService.uploadNewFile(file, visibility, userId);
		
		return new ResponseEntity<FileResponseDto>(uploadedFile, HttpStatus.CREATED);
	}
	
	@GetMapping("/share/{token}")
	public ResponseEntity<Resource> getSharedFile(@PathVariable String token){
		
		FileDownloadDto file = fileService.getSharedFile(token);
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION,
				"inline; filename=\""
				+ file.getFileName()
				+ "\""
				)
				.contentType(MediaType.parseMediaType(file.getContentType()))
				.body(file.getResource());
	}
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<FileResponseDto>> getAllFilesByUser(@PathVariable Long userId){
		List<FileResponseDto> files = fileService.getAllFilesByUser(userId);
		
		return ResponseEntity.ok(files);
	}
	
	@DeleteMapping("/{fileId}")
	public ResponseEntity<String> deleteFile(@PathVariable Long fileId){
		fileService.deleteFile(fileId);
		
		return ResponseEntity.ok("File deleted successfully");
	}
	
	@PostMapping("/{fileId}/visibility")
	public ResponseEntity<FileResponseDto> updateVisibility(@PathVariable Long fileId, @RequestBody UpdateVisibilityDto visibilityDto){
		FileResponseDto updatedFile = fileService.updateVisibility(fileId, visibilityDto);
		
		return ResponseEntity.ok(updatedFile);
	}
}
