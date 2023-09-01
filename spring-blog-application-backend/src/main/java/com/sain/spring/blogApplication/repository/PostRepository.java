package com.sain.spring.blogApplication.repository;

import com.sain.spring.blogApplication.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
