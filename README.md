# Smart Parking Lot System

A Low-Level Design (LLD) implementation of a backend system for a smart parking lot. This system manages vehicle entry and exit, allocates parking spots based on availability and vehicle type, and calculates parking fees.

## 🚀 Features

-   **Multi-Level Parking**: Supports multiple floors with a specific number of spots.
-   **Vehicle Support**: handles Motorcycles, Cars, and Buses.
-   **Smart Allocation**: Automatically assigns the nearest available spot (Lowest Floor First strategy).
-   **Fee Calculation**: Calculates parking fees based on duration and vehicle type upon exit.
-   **RESTful API**: Exposes endpoints for entry and exit operations.
-   **Scalable Design**: Built using Object-Oriented Programming (OOP) principles and Design Patterns (Singleton, Strategy).

## 🛠️ Tech Stack

-   **Language**: TypeScript
-   **Runtime**: Node.js
-   **Framework**: Express.js

## 📂 Project Structure

```
src/
├── controllers/    # Request handlers (ParkingController)
├── models/         # Core entities (Vehicle, ParkingSpot, Ticket, etc.)
├── routes/         # API route definitions
├── services/       # Business logic (ParkingLot singleton, PricingStrategy)
└── index.ts        # Application entry point
```

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd parking-lot-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application (Development mode):**
    ```bash
    npm run dev
    ```
    The server will start at `http://localhost:3000`.

## 📖 API Documentation

### 1. **Vehicle Entry**
Allocates a parking spot and issues a ticket.

-   **Endpoint**: `POST /api/v1/parking/entry`
-   **Body**:
    ```json
    {
      "licensePlate": "KA-01-AB-1234",
      "vehicleType": "CAR"  // Options: MOTORCYCLE, CAR, BUS
    }
    ```
-   **Response (Success - 201)**:
    ```json
    {
      "message": "Entry successful",
      "ticketId": "X7Z9A2B1C",
      "spot": {
        "floor": 0,
        "number": 6
      },
      "entryTime": "2023-10-27T10:00:00.000Z"
    }
    ```

### 2. **Vehicle Exit**
Processes vehicle exit, calculates the fee, and frees up the spot.

-   **Endpoint**: `POST /api/v1/parking/exit`
-   **Body**:
    ```json
    {
      "ticketId": "X7Z9A2B1C"
    }
    ```
-   **Response (Success - 200)**:
    ```json
    {
      "message": "Exit successful",
      "ticketId": "X7Z9A2B1C",
      "entryTime": "2023-10-27T10:00:00.000Z",
      "exitTime": "2023-10-27T12:30:00.000Z",
      "fee": 60 
    }
    ```

## 🧩 Low-Level Design (LLD) Overview

### Core Classes
-   **`ParkingLot`**: Singleton class that manages the overall state of floors and active tickets.
-   **`ParkingFloor`**: Manages spots on a specific level.
-   **`ParkingSpot`**: Represents an individual parking space with a specific type (Coin, Compact, Large).
-   **`Vehicle`**: Base entity for different vehicle types.
-   **`PricingStrategy`**: Encapsulates the fee calculation logic.

### Algorithms
-   **Spot Allocation**: The system iterates through floors starting from the ground floor (0) to find the first available spot that matches the vehicle type.
-   **Fee Calculation**: 
    -   Motorcycle: $10/hour
    -   Car: $20/hour
    -   Bus: $50/hour
    -   *Note: Partial hours are rounded up.*

## 🧪 Testing

You can use the provided `requests.http` file (requires REST Client extension for VS Code) to test the API endpoints directly.
