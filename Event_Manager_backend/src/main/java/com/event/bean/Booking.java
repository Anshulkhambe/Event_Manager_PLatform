    package com.event.bean;

    import jakarta.persistence.*;
    import java.time.LocalDateTime;
    import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // Import this

    @Entity
    @Table(name = "bookings")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // ADD THIS LINE
    public class Booking {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY) // Many bookings to one event
        @JoinColumn(name = "event_id", nullable = false)
        @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Optional: Add here too for safety
        private Event event;

        // Optional: Link to a registered user
        @ManyToOne(fetch = FetchType.LAZY) // Many bookings to one user
        @JoinColumn(name = "user_id") // This column can be null if booking is by guest
        @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Optional: Add here too for safety
        private User user; // This is the User entity reference

        @Column(name = "user_name", nullable = false)
        private String userName; // Store name for guest bookings or convenience

        @Column(name = "user_email", nullable = false) // This was the previous issue
        private String userEmail; // Store email for guest bookings or convenience

        @Column(name = "number_of_tickets", nullable = false)
        private int numberOfTickets;

        @Column(name = "booking_date_time", nullable = false)
        private LocalDateTime bookingDateTime;

        @Column(nullable = false)
        private String status; // e.g., PENDING_PAYMENT, CONFIRMED, CANCELLED, FAILED

        @Column(name = "payment_id")
        private String paymentId; // Transaction ID from payment gateway

        public Booking() {
        }

        // --- Getters and Setters ---
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Event getEvent() { return event; }
        public void setEvent(Event event) { this.event = event; }
        public User getUser() { return user; }
        public void setUser(User user) { this.user = user; }
        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }
        public String getUserEmail() { return userEmail; }
        public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
        public int getNumberOfTickets() { return numberOfTickets; }
        public void setNumberOfTickets(int numberOfTickets) { this.numberOfTickets = numberOfTickets; }
        public LocalDateTime getBookingDateTime() { return bookingDateTime; }
        public void setBookingDateTime(LocalDateTime bookingDateTime) { this.bookingDateTime = bookingDateTime; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getPaymentId() { return paymentId; }
        public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

        @Override
        public String toString() {
            return "Booking{" +
                   "id=" + id +
                   ", eventTitle='" + (event != null ? event.getTitle() : "N/A") + '\'' +
                   ", userName='" + userName + '\'' +
                   ", userEmail='" + userEmail + '\'' +
                   ", numberOfTickets=" + numberOfTickets +
                   ", bookingDateTime=" + bookingDateTime +
                   ", status='" + status + '\'' +
                   ", paymentId='" + paymentId + '\'' +
                   ", userId=" + (user != null ? user.getId() : "null") +
                   '}';
        }
    }
    