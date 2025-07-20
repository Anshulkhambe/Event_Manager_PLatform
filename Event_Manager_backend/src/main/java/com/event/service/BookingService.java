package com.event.service;

import com.event.bean.Booking;
import com.event.bean.Event;
import com.event.bean.User;
import com.event.repository.BookingRepository;
import com.event.repository.EventRepository;
import com.event.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays; // Import Arrays
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // Define statuses to exclude from general listings
    private static final List<String> EXCLUDED_STATUSES = Arrays.asList("CANCELLED", "FAILED");

    /**
     * Creates a booking with PENDING_PAYMENT status and temporarily reduces available tickets.
     * This is the initial step before payment processing.
     *
     * @param eventId The ID of the event.
     * @param userName The name of the user making the booking.
     * @param userEmail The email of the user making the booking.
     * @param numberOfTickets The number of tickets being booked.
     * @return The created Booking entity with PENDING_PAYMENT status.
     * @throws RuntimeException if the event is not found or not enough tickets are available.
     */
    @Transactional
    public Booking createPendingBooking(Long eventId, String userName, String userEmail, int numberOfTickets) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id " + eventId));

        if (event.getAvailableTickets() < numberOfTickets) {
            throw new RuntimeException("Not enough tickets available for this event.");
        }

        // Reduce available tickets. This is a temporary hold.
        event.setAvailableTickets(event.getAvailableTickets() - numberOfTickets);
        eventRepository.save(event); // Update available tickets in the event

        Booking booking = new Booking();
        booking.setEvent(event);
        booking.setUserName(userName);
        booking.setUserEmail(userEmail);
        booking.setNumberOfTickets(numberOfTickets);
        booking.setBookingDateTime(LocalDateTime.now());
        booking.setStatus("PENDING_PAYMENT"); // Initial status

        // Attempt to link to a registered user if email matches
        userRepository.findByEmail(userEmail).ifPresent(booking::setUser);

        return bookingRepository.save(booking); // Save the pending booking
    }

    /**
     * Confirms a pending booking after successful payment.
     *
     * @param bookingId The ID of the booking to confirm.
     * @param paymentId The payment ID received from the payment gateway.
     * @throws RuntimeException if the booking is not found or not in PENDING_PAYMENT status.
     */
    @Transactional
    public void confirmBooking(Long bookingId, String paymentId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

        if ("PENDING_PAYMENT".equals(booking.getStatus())) {
            booking.setStatus("CONFIRMED");
            booking.setPaymentId(paymentId); // Store the payment ID
            bookingRepository.save(booking);

            // Send email confirmation
            try {
                emailService.sendBookingConfirmation(
                    booking.getUserEmail(),
                    booking.getEvent().getTitle(),
                    booking.getNumberOfTickets(),
                    booking.getId().toString()
                );
            } catch (Exception e) {
                System.err.println("Failed to send booking confirmation email for booking ID " + bookingId + ": " + e.getMessage());
                // Log the email failure but don't prevent booking confirmation
            }
        } else {
            throw new RuntimeException("Booking with ID " + bookingId + " is not in PENDING_PAYMENT status.");
        }
    }

    /**
     * Marks a pending booking as FAILED and reverts the tickets if payment fails.
     *
     * @param bookingId The ID of the booking that failed.
     * @throws RuntimeException if the booking is not found or not in PENDING_PAYMENT status.
     */
    @Transactional
    public void failBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

        if ("PENDING_PAYMENT".equals(booking.getStatus())) {
            booking.setStatus("FAILED");
            // Revert tickets if payment failed
            Event event = booking.getEvent();
            if (event != null) { // Ensure event is not null
                event.setAvailableTickets(event.getAvailableTickets() + booking.getNumberOfTickets());
                eventRepository.save(event);
            }
            bookingRepository.save(booking);
        } else {
            throw new RuntimeException("Booking with ID " + bookingId + " is already " + booking.getStatus() + " and cannot be marked as failed.");
        }
    }

    /**
     * Retrieves all bookings from the database, excluding 'CANCELLED' and 'FAILED' statuses.
     * This is for the Admin Dashboard.
     * @return A list of active/pending Booking entities.
     */
    public List<Booking> getAllBookings() {
        return bookingRepository.findByStatusNotIn(EXCLUDED_STATUSES);
    }

    /**
     * Retrieves a single booking by its ID.
     *
     * @param id The ID of the booking.
     * @return An Optional containing the Booking if found, otherwise empty.
     */
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    /**
     * Retrieves bookings made by a specific user email.
     *
     * @param userEmail The email of the user.
     * @return A list of Booking entities associated with the given email.
     */
    public List<Booking> getBookingsByUserEmail(String userEmail) {
        // You might also want to filter by status here if this is used for display
        return bookingRepository.findByUserEmail(userEmail);
    }

    /**
     * Retrieves bookings for a specific registered user ID, excluding 'CANCELLED' and 'FAILED' statuses.
     * This is for the User's "My Bookings" page.
     * @param userId The ID of the registered user.
     * @return A list of active/pending Booking entities associated with the given user ID.
     */
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserIdAndStatusNotIn(userId, EXCLUDED_STATUSES);
    }

    /**
     * Cancels a confirmed or pending booking and reverts the tickets.
     *
     * @param id The ID of the booking to cancel.
     * @throws RuntimeException if the booking is not found or is already cancelled.
     */
    @Transactional
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id " + id));

        // Only allow cancellation if not already cancelled or failed
        if (!"CANCELLED".equals(booking.getStatus()) && !"FAILED".equals(booking.getStatus())) {
            Event event = booking.getEvent();
            if (event != null) {
                // Return tickets to the event's available count
                event.setAvailableTickets(event.getAvailableTickets() + booking.getNumberOfTickets());
                eventRepository.save(event);
            }

            booking.setStatus("CANCELLED");
            bookingRepository.save(booking);

            // Optionally send cancellation email
            // emailService.sendBookingCancellation(booking.getUserEmail(), booking.getEvent().getTitle(), booking.getId().toString());

        } else {
            throw new RuntimeException("Booking with ID " + id + " is already " + booking.getStatus() + " and cannot be cancelled.");
        }
    }
}
