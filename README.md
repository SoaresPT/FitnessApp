# Fitness App API Documentation

This documentation provides information on the endpoints and usage of the Fitness App API. <br> 

<strong>The live version can be found</strong> [here](https://group1-jh7u.onrender.com/).

![Alt text](https://users.metropolia.fi/~andriid/Flight-game-v2-img/fitness_app_main.png)



## Table of Contents

- [Introduction](#introduction)
- [Endpoints](#endpoints)
  - [User Registration](#user-registration)
  - [Get All Registered Users](#get-all-registered-users)
  - [Delete User by Email](#delete-user-by-email)
  - [Update User by Email](#update-user-by-email)
- [Usage](#usage)

## Introduction

The Fitness App API is responsible for user registration, retrieval of registered users, user deletion, and user data update.

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

### Delete User by Email

- **URL:** `/users/:email`
- **Method:** DELETE
- **Description:** Delete a user based on their email address.
- **URL Parameters:**
  - `email` (string, required): User's email address.
- **Success Response (Status Code 200):**
  - `{ "message": "User deleted successfully" }`
- **Error Response (Status Code 500):**
  - `{ "error": "Internal server error" }`

### Update User by Email

- **URL:** `/users/:email`
- **Method:** PUT
- **Description:** Update a user's information based on their email address.
- **URL Parameters:**
  - `email` (string, required): User's email address.
- **Request Body:** Updated user data.
- **Success Response (Status Code 200):**
  - `{ "message": "User updated successfully" }`
- **Error Response (Status Code 500):**
  - `{ "error": "Internal server error" }`

## Usage

To use the Fitness App API, you can make HTTP requests to the specified endpoints using your preferred HTTP client (e.g., Postman). Here are some examples of how to use the API:

### User Registration

To register a new user, make a POST request to the `/signup` endpoint with the following request body:

```http
POST http://localhost:3001/api/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get All Registered Users

To retrieve a list of all registered users, make a GET request to the `/users` endpoint.

### Delete User by Email

To delete a user by their email address, make a DELETE request to the `/users/:email` endpoint, where :email is the email address of the user you want to delete.

### Update User by Email

To update a user's information by their email address, make a PUT request to the `/users/:email` endpoint, where :email is the email address of the user you want to update. Include the updated user data in the request body.
