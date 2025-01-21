# User Management System API

A RESTful API built with Node.js, Express, and MongoDB for managing users and admin functionality. This project was developed as part of a Backend Developer Internship assignment.

## Assignment Objective

Create a RESTful API for User Management System that demonstrates understanding of backend development principles and problem-solving skills.

## Features Required

1. **User Registration**
   - Users can create account with name, email, password, phone number
   - Input validation for email format and password length
   - Prevention of duplicate email registrations

2. **User Authentication**
   - Login functionality using email and password
   - Proper error handling for invalid credentials

3. **Profile Management**
   - Users can view their details (name, email, phone number)
   - Users can update their profile information

4. **Account Deactivation**
   - Users can deactivate their accounts
   - Implemented using soft delete approach (maintaining data but preventing login)

5. **Super Admin Features**
   - Special access to view all users' details
   - Secure admin authentication system
   - Uses same database model with role-based access

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for Authentication
- bcrypt for Password Hashing

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd user-management-system
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables in `.env`
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your_jwt_secret_key
```

4. Start the server
```bash
npm run dev
```

## API Endpoints

### Authentication
```bash
POST /api/auth/register
{
    "name": "Test User",
    "email": "user@test.com",
    "password": "password123",
    "phoneNumber": "1234567890"
}

POST /api/auth/login
{
    "email": "user@test.com",
    "password": "password123"
}
```

### User Routes (Protected)
```bash
GET /api/users/me
PATCH /api/users/update-me
DELETE /api/users/deactivate
```

### Admin Routes (Protected)
```bash
GET /api/admin/users
GET /api/admin/dashboard
PATCH /api/admin/users/:userId/status
```

## Key Design Decisions

1. **Account Deactivation Strategy**
   - Implemented soft delete using isActive flag
   - Preserves user data while preventing access
   - Better for data analysis and recovery

2. **Super Admin Implementation**
   - Single user model with role-based access
   - Admin created through setup script
   - Secure and maintainable approach

## Data Validation

- Email format validation
- Password minimum length (8 characters)
- Phone number format validation
- Unique email constraint
- Required field validation

## Error Handling

- Graceful error messages
- Proper HTTP status codes
- Validation error responses
- Authentication error handling

## Testing

Import the provided Postman collection to test all endpoints:
1. Register new users
2. Test authentication
3. Test protected routes
4. Test admin features

## Security Features

- Password hashing
- JWT-based authentication
- Role-based authorization
- Input sanitization
- Protected routes middleware

## Project Structure
```
user-management-system/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
└── package.json
```
