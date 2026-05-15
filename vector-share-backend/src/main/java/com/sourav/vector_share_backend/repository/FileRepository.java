package com.sourav.vector_share_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sourav.vector_share_backend.model.StoredFile;

@Repository
public interface FileRepository extends JpaRepository<StoredFile, Long>{
	
}
