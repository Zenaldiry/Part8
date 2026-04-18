# Library Application - Full Stack Open Part 8 Exercises

This repository contains the complete, step-by-step solutions for Part 8 of the [Full Stack Open](https://fullstackopen.com/en/part8) course. The project is structured into directories corresponding to the major milestones of the exercises.

## Project Structure

The repository is organized based on the exercise groups, reflecting the progressive development of the application:

- **`part8.1-8.7`**: The initial backend implementation. This version features a GraphQL server with in-memory data (hardcoded arrays) for books and authors. It includes basic queries and mutations.

- **`part8.8-8.12`**: The first version of the frontend. This directory contains a React application that consumes the GraphQL API from the previous part, allowing users to view authors and books, add new books, and edit author birth years.

- **`part8.13-8.16`**: A major backend refactor. This version migrates the backend from in-memory data to a persistent MongoDB database. It also introduces user creation and a login system with JWT-based authentication.

- **`part8.17-8.22`**: A major frontend refactor. This version updates the React application to work with the new authenticated backend. It adds a login page, token handling, genre-based filtering, and a "recommendations" view.

- **`part8.23-8.26`**: The final version with advanced features. This part enhances both the backend and frontend to include:
  - **Backend**: Real-time updates using GraphQL Subscriptions and a performance optimization to solve the N+1 query problem using `DataLoader`.
  - **Frontend**: The ability to receive real-time updates via subscriptions, ensuring the UI is always in sync across all clients.

## Tech Stack

- **Backend**: Node.js, Express, Apollo Server, GraphQL, MongoDB (with Mongoose), JSON Web Tokens (JWT), WebSockets, DataLoader.
- **Frontend**: React, React Router, Apollo Client, `react-select`.

## How to Run a Specific Part

To run the code for a specific set of exercises, navigate to the corresponding directory and follow the setup instructions.

**Example: Running the final version (`part8.23-8.26`)**

### 1. Backend Setup

```bash
# 1. Navigate to the final backend directory
cd part8.23-8.26/backend

# 2. Install dependencies
npm install

# 3. Create and configure the .env file (copy from .env.example)
cp .env.example .env
# ...then edit .env with your MongoDB URI and JWT Secret

# 4. Run the backend server
npm start
```
