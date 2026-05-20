package com.sourav.vector_share_backend.dto.request;

import com.sourav.vector_share_backend.enums.Visibility;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateVisibilityDto {
	
	private Visibility visibility;
}
