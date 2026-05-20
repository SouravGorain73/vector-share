package com.sourav.vector_share_backend.dto.response;

import org.springframework.core.io.Resource;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileDownloadDto {

	private Resource resource;
	
	private String fileName;
}
