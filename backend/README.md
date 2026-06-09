# Skincare Website - Backend API

## Description
Express.js REST API backend for the skincare website using MongoDB.

## Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

## Project Structure

```
backend/
├── config/          # Configuration files (database, etc.)
├── models/          # MongoDB schemas
├── routes/          # API route handlers
├── controllers/     # Business logic controllers
├── middleware/      # Custom middleware
├── server.js        # Main server file
├── package.json     # Dependencies and scripts
├── .env.example     # Environment variables template
└── README.md        # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

## Requirements
- Node.js 14+
- MongoDB
- npm or yarn

## Notes
- Controllers are placeholder implementations. Implement the actual business logic in the `controllers` folder.
- Middleware for authentication and authorization is ready to be integrated.
