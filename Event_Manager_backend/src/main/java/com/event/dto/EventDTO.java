package com.event.dto;

import lombok.Data; // Assuming Lombok is used for getters/setters, otherwise add them manually
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
// import org.springframework.format.annotation.DateTimeFormat; // REMOVE THIS IMPORT

import java.time.Instant; // Changed from LocalDateTime

@Data // Lombok annotation for getters, setters, equals, hashCode, toString
public class EventDTO {
    private Long id; // For update operations

    @NotBlank(message = "Title cannot be blank")
    private String title;

    private String description;

    @NotNull(message = "Date and time cannot be null")
    // @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) // REMOVE THIS ANNOTATION
    private Instant dateTime; // Changed to Instant

    @NotBlank(message = "Location cannot be blank")
    private String location;

    @Min(value = 0, message = "Price cannot be negative")
    private double price;

    @Min(value = 1, message = "Total tickets must be at least 1")
    private int totalTickets;

    // availableTickets is derived or set internally, not directly from DTO for creation
    // For update, it might be included, but for creation, it should default to totalTickets

    private String imageUrl; // Optional

    // --- Manual Getters and Setters (if not using Lombok @Data) ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getDateTime() { // Changed to Instant
        return dateTime;
    }

    public void setDateTime(Instant dateTime) { // Changed to Instant
        this.dateTime = dateTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getTotalTickets() {
        return totalTickets;
    }

    public void setTotalTickets(int totalTickets) {
        this.totalTickets = totalTickets;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
