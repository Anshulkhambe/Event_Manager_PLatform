package com.event.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class PaymentVerificationRequest {
    @NotBlank(message = "Razorpay Payment ID cannot be blank")
    private String razorpayPaymentId;

    @NotBlank(message = "Razorpay Order ID cannot be blank")
    private String razorpayOrderId;

    @NotBlank(message = "Razorpay Signature cannot be blank")
    private String razorpaySignature;

    @NotNull(message = "Booking ID cannot be null")
    private Long bookingId; // Internal booking ID to confirm

	public String getRazorpayPaymentId() {
		return razorpayPaymentId;
	}

	public void setRazorpayPaymentId(String razorpayPaymentId) {
		this.razorpayPaymentId = razorpayPaymentId;
	}

	public String getRazorpayOrderId() {
		return razorpayOrderId;
	}

	public void setRazorpayOrderId(String razorpayOrderId) {
		this.razorpayOrderId = razorpayOrderId;
	}

	public String getRazorpaySignature() {
		return razorpaySignature;
	}

	public void setRazorpaySignature(String razorpaySignature) {
		this.razorpaySignature = razorpaySignature;
	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}
    
    
}
