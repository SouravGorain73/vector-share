package com.sourav.vector_share_backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {
	
	@Bean
	ModelMapper getModelMapper() {
		return new ModelMapper();
	}

}
