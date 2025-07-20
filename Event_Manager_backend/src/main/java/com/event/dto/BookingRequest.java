package com.event.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class BookingRequest {
    @NotNull(message = "Event ID cannot be null")
    private Long eventId;

    @NotBlank(message = "User name cannot be blank")
    private String userName;

    @NotBlank(message = "User email cannot be blank")
    @Email(message = "Invalid email format")
    private String userEmail;

    @Min(value = 1, message = "Number of tickets must be at least 1")
    private int numberOfTickets;

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public int getNumberOfTickets() {
		return numberOfTickets;
	}

	public void setNumberOfTickets(int numberOfTickets) {
		this.numberOfTickets = numberOfTickets;
	}
    
    
}