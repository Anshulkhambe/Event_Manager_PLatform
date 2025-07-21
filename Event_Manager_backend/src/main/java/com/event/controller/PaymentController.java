package com.event.controller;

import com.event.dto.OrderRequest;
import com.event.dto.PaymentResponse;
import com.event.dto.PaymentVerificationRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

import com.event.bean.Booking;
import com.event.service.BookingService;
import com.event.service.RazorpayService;
import com.event.service.EventService;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "https://event-manager-platform.onrender.com")
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private EventService eventService;

    @Value("${razorpay.key.id}")
    private String keyId;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            long amountInPaisa = (long) (orderRequest.getAmount() * 100);

            Long eventIdAsLong = null;
            if (orderRequest.getEventId() != null) {
                eventIdAsLong = Long.valueOf(orderRequest.getEventId().toString());
            }

            Booking pendingBooking = bookingService.createPendingBooking(
                eventIdAsLong,
                orderRequest.getUserName(),
                orderRequest.getUserEmail(),
                orderRequest.getNumberOfTickets()
            );

            if (amountInPaisa == 0) {
                bookingService.confirmBooking(pendingBooking.getId(), "FREE_EVENT_PAYMENT");
                PaymentResponse freeResponse = new PaymentResponse();
                freeResponse.setOrderId("FREE_" + pendingBooking.getId());
                freeResponse.setCurrency(orderRequest.getCurrency());
                freeResponse.setAmount(0);
                freeResponse.setKeyId(keyId);
                freeResponse.setBookingId(pendingBooking.getId());
                return new ResponseEntity<>(freeResponse, HttpStatus.OK);
            }

            String receipt = "receipt_" + pendingBooking.getId();

            Order razorpayOrder = razorpayService.createRazorpayOrder(
                amountInPaisa,
                orderRequest.getCurrency(),
                receipt
            );

            PaymentResponse response = new PaymentResponse();
            response.setOrderId(razorpayOrder.get("id").toString());
            response.setCurrency(razorpayOrder.get("currency").toString());
            response.setAmount(((Number) razorpayOrder.get("amount")).doubleValue());
            response.setKeyId(keyId);
            response.setBookingId(pendingBooking.getId());

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (RazorpayException e) {
            System.err.println("Error creating Razorpay order: " + e.getMessage());
            return new ResponseEntity<>("Error creating Razorpay order: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            System.err.println("Booking service error during order creation: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.err.println("An unexpected error occurred: " + e.getMessage());
            return new ResponseEntity<>("An unexpected server error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody PaymentVerificationRequest request) {
        try {
            if (request.getBookingId() == null) {
                return new ResponseEntity<>("Booking ID is missing for verification.", HttpStatus.BAD_REQUEST);
            }

            boolean isVerified = razorpayService.verifyPaymentSignature(
                request.getRazorpaySignature(),
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId()
            );

            if (isVerified) {
                bookingService.confirmBooking(request.getBookingId(), request.getRazorpayPaymentId());
                return new ResponseEntity<>("Payment verified and booking confirmed!", HttpStatus.OK);
            } else {
                bookingService.failBooking(request.getBookingId());
                return new ResponseEntity<>("Payment verification failed! Booking marked as failed.", HttpStatus.BAD_REQUEST);
            }
        } catch (RuntimeException e) {
            System.err.println("Error during payment verification or booking update: " + e.getMessage());
            return new ResponseEntity<>("Error processing payment verification: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
