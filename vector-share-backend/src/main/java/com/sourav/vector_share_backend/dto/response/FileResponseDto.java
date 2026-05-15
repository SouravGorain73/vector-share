package com.sourav.vector_share_backend.dto.response;

import java.time.LocalDateTime;

import com.sourav.vector_share_backend.enums.Visibility;

import lombok.Data;

@Data
public class FileResponseDto {

    private Long id;

    private String originalFileName;

    private Long fileSize;

    private Visibility visibility;

    private String shareLink;
    
    private LocalDateTime uploadedAt;
}