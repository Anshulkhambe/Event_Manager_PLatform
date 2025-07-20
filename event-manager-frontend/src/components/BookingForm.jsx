// src/components/BookingForm.jsx
import React, { useState } from 'react';
import api from '../api/api'; // Use your configured Axios API instance
import { useAuth } from '../context/AuthContext'; // To prefill user info if logged in

const BookingForm = ({ eventId, eventDetails, onBookingSuccess }) => {
  const { user, isAuthenticated } = useAuth(); // Get authenticated user details

  const [numberOfTickets, setNumberOfTickets] = useState(1);
  // Prefill userName and userEmail from authenticated user data if available
  // Ensure user.username and user.email are available after AuthContext fix
  const [userName, setUserName] = useState(user ? user.username : ''); 
  const [userEmail, setUserEmail] = useState(user ? user.email : ''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleBookTickets = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // --- Console logs for debugging values before sending ---
    console.log("BookingForm: Submitting with userName:", userName);
    console.log("BookingForm: Submitting with userEmail:", userEmail);
    console.log("BookingForm: Submitting with numberOfTickets:", numberOfTickets);
    // --- End console logs ---

    // Client-side validation for number of tickets
    if (numberOfTickets <= 0) {
      setError('Number of tickets must be at least 1.');
      setLoading(false);
      return;
    }

    // Client-side validation for available tickets
    if (eventDetails.availableTickets < numberOfTickets) {
      setError(`Only ${eventDetails.availableTickets} tickets are available.`);
      setLoading(false);
      return;
    }

    // Client-side validation for name and email if user is NOT authenticated
    if (!isAuthenticated) {
      if (!userName.trim()) {
        setError('Please provide your name.');
        setLoading(false);
        return;
      }
      if (!userEmail.trim() || !userEmail.includes('@')) {
        setError('Please provide a valid email address.');
        setLoading(false);
        return;
      }
    } else {
      // If authenticated, ensure userEmail is populated from the context's user object
      // This is a safeguard, as the state should already be prefilled.
      if (!user?.email) {
        setError('Authenticated user email not found. Please re-login.');
        setLoading(false);
        return;
      }
      // Ensure the state reflects the authenticated user's email if it somehow got out of sync
      if (userEmail !== user.email) {
          setUserEmail(user.email);
      }
    }


    try {
      // 1. Call backend to create a Razorpay order and a PENDING booking
      const orderCreationResponse = await api.post(
        '/payments/create-order', // Use relative path with Axios instance
        {
          amount: eventDetails.price * numberOfTickets,
          currency: 'INR', // Or the currency of your event
          eventId: eventId,
          userName: userName,
          userEmail: userEmail, // THIS IS THE KEY FIELD, now correctly populated
          numberOfTickets: numberOfTickets,
        }
      );

      const { orderId, currency, amount, keyId, bookingId } = orderCreationResponse.data;

      // Handle free events separately
      if (eventDetails.price === 0) {
        setSuccess(true);
        // Using a custom message box instead of alert()
        // For a real app, you'd use a proper modal/toast notification system
        const messageBox = document.createElement('div');
        messageBox.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
        messageBox.textContent = 'Booking confirmed for free event!';
        document.body.appendChild(messageBox);
        setTimeout(() => {
          document.body.removeChild(messageBox);
        }, 3000); // Remove after 3 seconds

        if (onBookingSuccess) {
          onBookingSuccess(); // Notify parent component to refresh event details
        }
        setUserName(user ? user.username : ''); // Reset or keep prefilled
        setUserEmail(user ? user.email : ''); // Reset or keep prefilled
        setNumberOfTickets(1);
        setLoading(false);
        return;
      }

      const options = {
        key: keyId, // Your Key ID from backend
        amount: amount, // Amount from backend (in paisa/cents)
        currency: currency,
        name: 'Eventify',
        description: eventDetails.title,
        order_id: orderId, // Order ID from backend
        handler: async function (response) {
          // This function is called when payment is successful
          try {
            // 2. Send payment verification details back to your backend
            const verificationResponse = await api.post(
              '/payments/verify', // Use relative path with Axios instance
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                bookingId: bookingId, // Pass the booking ID received from the /create-order step
              }
            );

            if (verificationResponse.status === 200) {
              setSuccess(true);
              // Using a custom message box instead of alert()
              const messageBox = document.createElement('div');
              messageBox.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
              messageBox.textContent = 'Payment successful and booking confirmed!';
              document.body.appendChild(messageBox);
              setTimeout(() => {
                document.body.removeChild(messageBox);
              }, 3000); // Remove after 3 seconds

              if (onBookingSuccess) {
                onBookingSuccess(); // Notify parent component to refresh event details
              }
              setUserName(user ? user.username : ''); // Reset or keep prefilled
              setUserEmail(user ? user.email : ''); // Reset or keep prefilled
              setNumberOfTickets(1);
            } else {
              setError('Payment verification failed on server.');
            }
          } catch (err) {
            setError('Error during payment verification.');
            console.error('Verification error:', err);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
          // contact: '9999999999' // Optional: if you collect phone number
        },
        notes: {
          event_id: eventId,
          booking_id: bookingId, // Also pass bookingId to Razorpay notes (optional, for Razorpay's records)
        },
        theme: {
          color: '#6366F1', // Indigo color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        // Handle failed payment here
        console.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description || 'Unknown error'}`);
        // Optionally, inform backend about failed payment to revert booking status if needed
        // api.post('/bookings/fail-payment', { bookingId: bookingId, error: response.error });
        setLoading(false);
      });
      rzp.open(); // Open the Razorpay payment dialog

    } catch (err) {
      setError(`Failed to process payment: ${err.response?.data || err.message}`);
      console.error('Payment initiation error:', err);
      setLoading(false);
    }
  };

  if (!eventDetails) return <div className="text-center p-4">Loading booking form...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-bold text-indigo-700 mb-4">Book Your Tickets</h3>
      {eventDetails.price === 0 && (
        <p className="text-lg text-green-600 font-semibold mb-4">This is a FREE event!</p>
      )}
      {eventDetails.availableTickets <= 0 ? (
        <p className="text-red-600 font-semibold text-lg">This event is sold out!</p>
      ) : (
        <>
          <p className="text-lg text-gray-700 mb-4">
            Available Tickets: <span className="font-semibold">{eventDetails.availableTickets}</span>
          </p>
          <form onSubmit={handleBookTickets} className="space-y-4">
            <div>
              <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2">
                Your Name:
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                disabled={isAuthenticated} // Disable if logged in, as name should come from user profile
              />
            </div>
            <div>
              <label htmlFor="userEmail" className="block text-gray-700 text-sm font-bold mb-2">
                Your Email:
              </label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                disabled={isAuthenticated} // Disable if logged in, as email should come from user profile
              />
            </div>
            <div>
              <label htmlFor="numberOfTickets" className="block text-gray-700 text-sm font-bold mb-2">
                Number of Tickets:
              </label>
              <input
                type="number"
                id="numberOfTickets"
                name="numberOfTickets"
                value={numberOfTickets}
                onChange={(e) => setNumberOfTickets(parseInt(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                min="1"
                max={eventDetails.availableTickets}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 w-full"
              disabled={loading || eventDetails.availableTickets <= 0}
            >
              {loading
                ? 'Processing...'
                : eventDetails.price > 0
                ? `Proceed to Pay $${(eventDetails.price * numberOfTickets).toFixed(2)}`
                : `Book Free Tickets`}
            </button>
            {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
            {success && <p className="text-green-500 text-xs italic mt-2">Booking confirmed!</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default BookingForm;
