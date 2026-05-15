package com.sourav.vector_share_backend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.sourav.vector_share_backend.enums.Visibility;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoredFile {

    @Id
    @GeneratedValue
    private Long id;

    private String originalFileName;

    private String storedFileName;

    private String filePath;

    private Long fileSize;
    
    @CreationTimestamp
    private LocalDateTime uploadedAt;

    @Enumerated(EnumType.STRING)
    private Visibility visibility;

    private String shareToken;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}