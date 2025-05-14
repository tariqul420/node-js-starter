# Node.js Starter Project

A Node.js starter project with Express and MongoDB.

## Features

- Express.js server
- MongoDB integration with native driver
- JWT authentication
- User management
- Error handling
- Environment variable configuration

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on the `.env.example` file and fill in your credentials

## Environment Variables

Create a `.env` file with the following variables:

```
PORT=3000
NODE_ENV=development

# MongoDB Atlas credentials
DATABASE_USERNAME=your_mongodb_username
DATABASE_PASSWORD=your_mongodb_password

# JWT Secret
ACCESS_TOKEN_SECRET=your_jwt_secret_key_here
```

## Running the Application

Development mode:

```
npm run dev
```

Production mode:

```
npm start
```

## API Endpoints

### Authentication

- `POST /api/jwt`: Generate JWT token
- `POST /api/jwt/logout`: Logout (clear cookie)

### User Management

- `POST /api/user`: Create a new user
- `PATCH /api/user/:email`: Update user information
- `GET /api/user/role/:email`: Get user role (requires authentication)

## Project Structure

```
src/
  ├── config/
  │   ├── config.js
  │   └── db.js
  ├── controllers/
  │   ├── jwtController.js
  │   └── userController.js
  ├── middleware/
  │   ├── auth.middleware.js
  │   └── error.middleware.js
  ├── routers/
  │   ├── jwtRoutes.js
  │   └── userRoutes.js
  ├── app.js
  └── server.js
```
