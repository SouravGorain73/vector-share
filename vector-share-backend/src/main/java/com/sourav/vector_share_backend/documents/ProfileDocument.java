package com.sourav.vector_share_backend.documents;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "profiles")
public class ProfileDocument {
	
	@Id
	private String id;
	private String clerkId;
	
	@Indexed(unique = true)
	private String email;
	private String firstName;
	private String lastName;
	private Integer credits;
	private String photoUrl;
	@CreatedDate
	private Instant createdAt;
	

}
