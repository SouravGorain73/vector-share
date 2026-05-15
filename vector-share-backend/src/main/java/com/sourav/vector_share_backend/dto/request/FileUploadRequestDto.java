package com.sourav.vector_share_backend.dto.request;

import com.sourav.vector_share_backend.enums.Visibility;

import lombok.Data;

@Data
public class FileUploadRequestDto {

    private Visibility visibility;
}
