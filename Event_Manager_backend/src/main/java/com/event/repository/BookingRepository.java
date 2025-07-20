package com.event.repository;

import com.event.bean.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserEmail(String userEmail);

    List<Booking> findByUserId(Long userId);

    List<Booking> findByUserIdAndStatusNotIn(Long userId, List<String> statuses);

    List<Booking> findByStatusNotIn(List<String> statuses);
}
