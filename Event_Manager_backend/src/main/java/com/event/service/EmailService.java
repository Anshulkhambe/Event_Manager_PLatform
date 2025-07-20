package com.event.service;

import jakarta.mail.*; // Import all necessary JavaMail API classes
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {

    // No longer @Autowired JavaMailSender if you're doing it manually here
    // private JavaMailSender mailSender;

    // Hardcode sender email and App Password here, matching your OTP method
    private static final String SENDER_EMAIL = "arkhambatman08@gmail.com";
    private static final String SENDER_PASSWORD = "zpwy bunu fqfz pdmf"; // Your Google App Password

    public void sendBookingConfirmation(String toEmail, String eventTitle, int numberOfTickets, String bookingId) {
        // SMTP server details
        String host = "smtp.gmail.com";
        String port = "465"; // SSL/TLS port

        // System properties for JavaMail session
        Properties properties = new Properties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true"); // Still good to include
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        properties.put("mail.smtp.socketFactory.port", port); // Match the port
        properties.put("mail.smtp.socketFactory.fallback", "false"); // Recommended for security
        properties.put("mail.smtp.ssl.trust", host); // Trust the host

        // Get the default Session object
        Session session = Session.getDefaultInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(SENDER_EMAIL, SENDER_PASSWORD);
            }
        });

        // Enable debugging for the session (optional, but good for troubleshooting)
        session.setDebug(true);

        try {
            // Create a default MimeMessage object
            MimeMessage message = new MimeMessage(session);

            // Set From: header field
            message.setFrom(new InternetAddress(SENDER_EMAIL));

            // Set To: header field
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));

            // Set Subject: header field
            message.setSubject("Event Booking Confirmation: " + eventTitle);

            // Set the actual message
            message.setText(
                "Dear User,\n\n" +
                "Your booking for the event '" + eventTitle + "' has been confirmed.\n" +
                "Number of tickets: " + numberOfTickets + "\n" +
                "Booking ID: " + bookingId + "\n\n" +
                "Thank you for booking with Eventify!\n" +
                "Best regards,\nEventify Team"
            );

            // Send message
            Transport.send(message);
            System.out.println("Booking confirmation email sent successfully to: " + toEmail + " for booking ID: " + bookingId);

        } catch (MessagingException e) {
            System.err.println("Error sending booking confirmation email to " + toEmail + ": " + e.getMessage());
            e.printStackTrace(); // Print full stack trace for detailed debugging
        }
    }
}
