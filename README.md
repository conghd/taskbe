# Task Management API

A backend API for managing tasks with user authentication, task CRUD operations, and task assignment features. This API is built with **Node.js**, **Express**, and **MongoDB** and uses **JWT** for authentication.

## Features

- **User Authentication**: Allows users to log in, register, and use a JWT token for secure access.
- **Task Management**: CRUD operations for tasks with fields like title, description, status, priority, and assigned user.
- **Task Assignment**: Assign tasks to users, filter tasks by status, and track task updates.
- **Pagination & Filtering**: Supports pagination and filtering for task list retrieval.
- **Swagger Docs**: Provides API documentation using Swagger UI.

## Technologies Used

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens) for authentication
- Swagger for API documentation

## Prerequisites

- Node.js (version 14 or above)
- MongoDB (or MongoDB Atlas for cloud deployment)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/task-management-api.git


### 2. Navigate to the project directory
```bash
cd task-management-api


### 3. Install dependencies
```bash
npm install


### 4. Set up environment variables
Create a .env file in the root of the project and configure the following variables:

    env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/taskdb   # or MongoDB Atlas connection string
    JWT_SECRET=your_jwt_secret_key

### 5. Start the server
Run the following command to start the server:

```bash
npm start
The server will start on http://localhost:5000.

## API Documentation
API documentation is available through Swagger UI. Once the server is running, navigate to:

```bash
http://localhost:5000/api-docs
Here, you can view and interact with the available API endpoints.

## Endpoints:
### 1. User Authentication
POST /api/users/login: Logs in a user and returns a JWT token.
POST /api/users/register: Registers a new user.

###2. Tasks Management
GET /api/tasks: Retrieves a list of tasks with pagination and filtering options.
POST /api/tasks: Creates a new task.
GET /api/tasks/:id: Retrieves a task by ID.
PUT /api/tasks/:id: Updates an existing task.
DELETE /api/tasks/:id: Deletes a task.

###3. User Management
GET /api/users: Retrieves a list of all users with pagination.


## Authentication
For endpoints that require authentication, the client must include a JWT token in the Authorization header as follows:
```
Authorization: Bearer <your_token>
The token is issued during the login process and should be stored securely on the client.

## Testing
Unit Tests
Unit tests for the API endpoints can be found in the tests/ directory. To run the tests, execute:

```bash
npm test

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
Express.js
MongoDB
JWT
Swagger UI