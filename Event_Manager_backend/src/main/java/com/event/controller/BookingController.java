package com.event.controller;

import com.event.bean.Booking;
import com.event.bean.User; // Import your User entity
import com.event.service.BookingService;
import com.event.service.UserService; // Autowired
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails; // Keep this import
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService; // Ensure this is Autowired

    // Admin only: Get all bookings
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Admin or User: Get booking by ID (Admin can get any, User can get their own)
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Optional<Booking> bookingOptional = bookingService.getBookingById(id);

        if (bookingOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Booking booking = bookingOptional.get();

        // If user is ADMIN, they can view any booking
        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.ok(booking);
        }

        // If user is USER, they can only view their own bookings
        // Retrieve the full User entity from the database using the username from UserDetails
        User currentUser = userService.findByUsername(userDetails.getUsername());

        if (booking.getUser() != null && booking.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.ok(booking);
        }
        // If booking is not linked to a registered user, or user is not the owner
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    // User only: Get bookings by authenticated user's ID
    @GetMapping("/my-bookings")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')") // Admin can also view their own bookings
    public List<Booking> getMyBookings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal(); // This will now be org.springframework.security.core.userdetails.User

        // Retrieve the full User entity from the database using the username from UserDetails
        // This avoids ClassCastException and ensures we get the correct User ID and other details.
        User currentUser = userService.findByUsername(userDetails.getUsername());

        if (currentUser != null) {
            System.out.println("Fetching bookings for user ID: " + currentUser.getId() + " and email: " + currentUser.getEmail());
            return bookingService.getBookingsByUserId(currentUser.getId());
        } else {
            System.err.println("Could not find User entity for username: " + userDetails.getUsername() + ". Cannot retrieve user ID for bookings.");
            return List.of(); // Return empty list
        }
    }

    // Admin or User: Cancel a booking (Admin can cancel any, User can cancel their own)
    @DeleteMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        try {
            Optional<Booking> bookingOptional = bookingService.getBookingById(id);
            if (bookingOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            Booking booking = bookingOptional.get();

            // Check if ADMIN or if the booking belongs to the current USER
            // Retrieve the full User entity from the database using the username from UserDetails
            User currentUser = userService.findByUsername(userDetails.getUsername());

            if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN")) ||
                (booking.getUser() != null && currentUser != null && booking.getUser().getId().equals(currentUser.getId()))) {
                bookingService.cancelBooking(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } catch (RuntimeException e) {
            System.err.println("Error cancelling booking " + id + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
