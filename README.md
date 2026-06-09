# Skincare Website - MERN Stack

A full-stack skincare e-commerce website built with MongoDB, Express.js, React, and Node.js.

## Project Structure

```
skincare website/
├── backend/               # Node.js + Express API
│   ├── config/           # Database configuration
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── controllers/      # Business logic
│   ├── middleware/       # Custom middleware
│   ├── server.js         # Entry point
│   ├── package.json      # Backend dependencies
│   ├── .env.example      # Environment template
│   └── README.md         # Backend documentation
├── frontend/             # React application
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API calls
│   │   ├── styles/       # Stylesheets
│   │   ├── App.js        # Main component
│   │   └── index.js      # Entry point
│   ├── package.json      # Frontend dependencies
│   └── README.md         # Frontend documentation
└── README.md             # This file
```

## Quick Start

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret

5. Start the backend:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS** - Styling

## Features

### Current
- User registration and login endpoints
- Product listing API
- MongoDB models for Users and Products
- Basic React components and routing
- API service layer for frontend

### To Implement
- User authentication with JWT
- Product filtering and search
- Shopping cart functionality
- Order management
- User reviews and ratings
- Admin dashboard
- Payment integration
- Email notifications

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

## Installation Requirements

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skincare
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Development Workflow

1. Start MongoDB service (if using local MongoDB)
2. Start backend: `npm run dev` (from backend folder)
3. Start frontend: `npm start` (from frontend folder)
4. Open browser to `http://localhost:3000`

## Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify `.env` file exists with correct values
- Ensure port 5000 is available

### Frontend won't start
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check that backend is running
- Verify port 3000 is available

### API calls failing
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API endpoints in `frontend/src/services/api.js`

## License

ISC

## Author

Your Name
