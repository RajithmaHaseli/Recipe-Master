package com.example.noticeboard.Repository;

import com.example.noticeboard.Entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
