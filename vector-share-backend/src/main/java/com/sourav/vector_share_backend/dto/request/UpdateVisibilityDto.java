package com.sourav.vector_share_backend.dto.request;

import com.sourav.vector_share_backend.enums.Visibility;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateVisibilityDto {
	
	@NotNull(message = "Visibility is required!")
	private Visibility visibility;
}
