package com.example.recipemaster.repository;

import com.example.recipemaster.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {}
