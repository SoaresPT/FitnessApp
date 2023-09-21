# Fitness App API Documentation

This documentation provides information on the endpoints and usage of the Fitness App API.

## Table of Contents

- [Introduction](#introduction)
- [Endpoints](#endpoints)
  - [User Registration](#user-registration)
  - [Get All Registered Users](#get-all-registered-users)
- [Usage](#usage)

## Introduction

The Fitness App API is responsible for user registration and retrieval of registered users.

Base URL for API requests: `http://localhost:3001/api`

## Endpoints

### User Registration

- **URL:** `/signup`
- **Method:** POST
- **Description:** Register a new user.
- **Request Body:**
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Success Response (Status Code 201):**
  - `{ "message": "User registered successfully" }`
- **Error Response (Status Code 400):**
  - `{ "error": "Email already exists. Please use a different email." }`
- **Error Response (Status Code 500):**
  - `{ "error": "Internal server error" }`

### Get All Registered Users

- **URL:** `/users`
- **Method:** GET
- **Description:** Retrieve a list of all registered users.
- **Success Response (Status Code 200):**
  - Array of user objects.

## Usage

To use the Fitness App API, you can make HTTP requests to the specified endpoints using your preferred HTTP client (e.g., Postman). Here's an example of user registration using the `signup` endpoint:

```http
POST http://localhost:3001/api/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```
For successful registration, you will receive a response with status code 201:
` {
  "message": "User registered successfully"
}
`

To retrieve a list of all registered users, make a GET request to the `/users` endpoint.

