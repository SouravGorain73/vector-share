package com.sourav.vector_share_backend.dto.request;

import com.sourav.vector_share_backend.enums.Visibility;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateVisibilityDto {
	
	@NotBlank(message = "Visibility is required!")
	private Visibility visibility;
}
