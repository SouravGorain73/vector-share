package com.sourav.vector_share_backend.dto.request;

import com.sourav.vector_share_backend.enums.Visibility;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FileUploadRequestDto {

	@NotBlank(message = "Visibility is required!")
    private Visibility visibility;
}
