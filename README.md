
# 🎉 Event Management System

An end-to-end Event Management Platform for organizing, booking, and managing events with secure authentication, payment integration, and email notifications.

## 🛠️ Tech Stack

### Backend (Spring Boot)
- Java 17+
- Spring Boot (Web, Security, JPA)
- MySQL
- JWT Authentication
- Razorpay API (Payment Gateway)
- JavaMail (Email Notification)

### Frontend (React + Vite)
- React 18+
- Vite (build tool)
- Tailwind CSS
- React Router
- Axios
- SweetAlert2 (for alerts)

---

## 📁 Project Structure
.
├── backend
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── example
│   │   │   │           └── eventmanagement
│   │   │   │               ├── config
│   │   │   │               │   └── SecurityConfig.java
│   │   │   │               ├── controllers
│   │   │   │               │   ├── AuthController.java
│   │   │   │               │   ├── BookingController.java
│   │   │   │               │   ├── EventController.java
│   │   │   │               │   └── PaymentController.java
│   │   │   │               ├── dtos
│   │   │   │               │   ├── BookingRequest.java
│   │   │   │               │   ├── EventDTO.java
│   │   │   │               │   ├── JwtResponse.java
│   │   │   │               │   ├── LoginRequest.java
│   │   │   │               │   ├── OrderRequest.java
│   │   │   │               │   ├── PaymentResponse.java
│   │   │   │               │   ├── PaymentVerificationRequest.java
│   │   │   │               │   └── RegisterRequest.java
│   │   │   │               ├── models
│   │   │   │               │   ├── Booking.java
│   │   │   │               │   ├── Event.java
│   │   │   │               │   ├── Role.java
│   │   │   │               │   └── User.java
│   │   │   │               ├── repositories
│   │   │   │               │   ├── BookingRepository.java
│   │   │   │               │   ├── EventRepository.java
│   │   │   │               │   ├── RoleRepository.java
│   │   │   │               │   └── UserRepository.java
│   │   │   │               └── services
│   │   │   │                   ├── BookingService.java
│   │   │   │                   ├── EmailService.java
│   │   │   │                   ├── EventService.java
│   │   │   │                   ├── JwtUserDetailsService.java
│   │   │   │                   ├── RazorpayService.java
│   │   │   │                   └── UserService.java
│   │   │   └── resources
│   │   │       ├── application.properties
│   │   │       └── static
│   │   └── test
│   └── pom.xml
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── BookingForm.jsx
│   │   │   ├── ConfirmationModal.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventForm.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages
│   │   │   ├── AddEditEventPage.jsx
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── AllEventsPage.jsx
│   │   │   ├── EventDetailsPage.jsx
│   │   │   ├── EventsPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── Sitemap.jsx
│   │   │   ├── UnauthorizedPage.jsx
│   │   │   └── UserBookingsPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.development (or .env)
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md



### 🔙 Backend (`/backend`)

#### 📂 Controllers
- `AuthController.java`: Handles login and registration.
- `EventController.java`: CRUD operations for events.
- `BookingController.java`: Book events and manage bookings.
- `PaymentController.java`: Handles Razorpay payment and verification.

#### 📂 Services
- `UserService.java`: Handles user-related operations.
- `EventService.java`: Event management business logic.
- `BookingService.java`: Booking logic.
- `EmailService.java`: Sends confirmation/notification emails.
- `RazorpayService.java`: Razorpay payment integration.
- `JwtUserDetailsService.java`: Manages JWT authentication.

#### 📂 DTOs
- `LoginRequest`, `RegisterRequest`, `JwtResponse`: Authentication data.
- `EventDTO`: Data Transfer Object for event info.
- `BookingRequest`: Booking payload.
- `OrderRequest`, `PaymentResponse`, `PaymentVerificationRequest`: Razorpay integration objects.

#### 📂 Repositories
- `UserRepository`, `RoleRepository`, `EventRepository`, `BookingRepository`: JPA-based data access layer.

---

### 🌐 Frontend (`/frontend`)

#### 📂 Pages
- `HomePage.jsx`: Main landing page.
- `LoginPage.jsx`, `RegisterPage.jsx`: Authentication pages.
- `AdminDashboardPage.jsx`: Event admin panel.
- `AddEditEventPage.jsx`: Create/edit event (admin).
- `AllEventsPage.jsx`, `EventsPage.jsx`, `EventDetailsPage.jsx`: View and explore events.
- `UserBookingsPage.jsx`: View user’s bookings.
- `UnauthorizedPage.jsx`, `NotFoundPage.jsx`: Fallback/error handling pages.
- `Sitemap.jsx`, `UserAgreement.jsx`, `PrivacyPolicy.jsx`: Legal/informational pages.

#### 📂 Components
- `Navbar.jsx`, `Layout.jsx`: UI structure and navigation.
- `EventForm.jsx`, `BookingForm.jsx`: Forms for event management and booking.
- `EventCard.jsx`: Display individual event.
- `ConfirmationModal.jsx`: UI modal for confirmations.
- `PrivateRoute.jsx`, `ProtectedRoute.jsx`: Route protection using auth context.

---

## ✅ Features Implemented

- 🔐 **User Authentication**
  - JWT-secured login and registration
  - Role-based access (admin/user)

- 🎭 **Event Management**
  - Create, edit, delete, and view events (admin)
  - List and view event details (users)

- 📆 **Event Booking**
  - Book events with automatic user assignment
  - View user's booked events

- 💳 **Payment Integration**
  - Razorpay for secure payments
  - Payment status verification and handling

- 📧 **Email Notifications**
  - Confirmation emails after successful registration or booking

- 🛡️ **Route Protection**
  - Protected admin/user routes using custom logic

- 📜 **Legal Pages**
  - Privacy Policy, Terms & Conditions, Sitemap

---

## 🚀 Getting Started

### 🧩 Backend Setup

```bash
cd backend
./mvnw clean install
# Or use your IDE (STS/IntelliJ) to run the Spring Boot app
