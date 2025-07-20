package com.event.dto;

import lombok.Data;

@Data
public class PaymentResponse {
    private String orderId;    // Razorpay Order ID
    private String currency;
    private double amount;     // Amount in paisa/cents from Razorpay
    private String keyId;      // Your Razorpay Key ID (needed by frontend)
    private Long bookingId;    // Internal booking ID
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getKeyId() {
		return keyId;
	}
	public void setKeyId(String keyId) {
		this.keyId = keyId;
	}
	public Long getBookingId() {
		return bookingId;
	}
	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}
    
    
}