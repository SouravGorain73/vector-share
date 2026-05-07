package com.sourav.vector_share_backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sourav.vector_share_backend.documents.ProfileDocument;

@Repository
public interface ProfileRepository extends MongoRepository<ProfileDocument, String>{
	
	Optional<ProfileDocument> findByEmail(String email);
}
