    package com.event.bean;

    import jakarta.persistence.*;
    import java.time.Instant; // Use Instant for datetime
    import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // Import this
    import java.util.Set; // Assuming you have a collection of bookings

    @Entity
    @Table(name = "events")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // ADD THIS LINE
    public class Event {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String title;

        @Column(columnDefinition = "TEXT") // For longer descriptions
        private String description;

        @Column(name = "date_time", nullable = false)
        private Instant dateTime; // Changed to Instant

        @Column(nullable = false)
        private String location;

        @Column(nullable = false)
        private double price;

        @Column(name = "total_tickets", nullable = false)
        private int totalTickets;

        @Column(name = "available_tickets", nullable = false)
        private int availableTickets; // Will be initialized with totalTickets

        @Column(name = "image_url")
        private String imageUrl;

        // Optional: If Event has a relationship to Bookings (e.g., OneToMany)
        // You might need @JsonIgnore or DTOs to prevent infinite recursion
        @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @JsonIgnoreProperties({"event", "hibernateLazyInitializer", "handler"}) // Ignore 'event' to prevent recursion
        private Set<Booking> bookings;

        public Event() {
            // Default constructor
        }

        // Constructor for creating new events
        public Event(String title, String description, Instant dateTime, String location, double price, int totalTickets, String imageUrl) {
            this.title = title;
            this.description = description;
            this.dateTime = dateTime;
            this.location = location;
            this.price = price;
            this.totalTickets = totalTickets;
            this.availableTickets = totalTickets; // Initialize available tickets
            this.imageUrl = imageUrl;
        }

        // --- Getters and Setters ---
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public Instant getDateTime() { return dateTime; }
        public void setDateTime(Instant dateTime) { this.dateTime = dateTime; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
        public int getTotalTickets() { return totalTickets; }
        public void setTotalTickets(int totalTickets) { this.totalTickets = totalTickets; }
        public int getAvailableTickets() { return availableTickets; }
        public void setAvailableTickets(int availableTickets) { this.availableTickets = availableTickets; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public Set<Booking> getBookings() { return bookings; }
        public void setBookings(Set<Booking> bookings) { this.bookings = bookings; }

        @PrePersist
        public void prePersist() {
            if (this.availableTickets == 0) { // Only set if not explicitly set
                this.availableTickets = this.totalTickets;
            }
        }
    }
    