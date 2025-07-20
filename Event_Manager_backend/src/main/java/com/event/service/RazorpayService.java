package com.event.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RazorpayService {

    private final String keyId;
    private final String keySecret;
    private final RazorpayClient razorpayClient; // Initialize once and reuse

    // Constructor injection for Razorpay keys
    public RazorpayService(@Value("${razorpay.key.id}") String keyId,
                           @Value("${razorpay.key.secret}") String keySecret) throws RazorpayException {
        this.keyId = keyId;
        this.keySecret = keySecret;
        this.razorpayClient = new RazorpayClient(keyId, keySecret); // Initialize client once
    }

    public Order createRazorpayOrder(long amount, String currency, String receipt) throws RazorpayException {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount); // amount in the smallest currency unit (e.g., paisa for INR)
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", receipt);
        orderRequest.put("payment_capture", 1); // Auto capture payment

        return razorpayClient.orders.create(orderRequest);
    }

    public boolean verifyPaymentSignature(String signature, String orderId, String paymentId) {
        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", orderId);
            options.put("razorpay_payment_id", paymentId);
            options.put("razorpay_signature", signature);

            return Utils.verifyPaymentSignature(options, keySecret); // ✅ correct usage
        } catch (RazorpayException e) {
            System.err.println("Razorpay Signature Verification Error: " + e.getMessage());
            return false;
        }
    }
}