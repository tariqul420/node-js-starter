# 🚀 Full-Stack Setup Server for Any Web Application

This server is built using **Node.js**, **Express**, and **MongoDB**, with JWT-based authentication and admin role management. It's designed for full-stack web applications and includes robust middleware configurations for security and scalability.

---

## Features

- 🛡️ **JWT Authentication**: Secure your endpoints with token-based authentication.
- 🔑 **Admin Role Management**: Restrict specific routes to admin users only.
- 🍪 **Cookie Handling**: Easily manage cookies for session persistence.
- 🗂️ **MongoDB Integration**: Seamlessly store and query data from MongoDB.
- 🌐 **CORS Configuration**: Allow cross-origin requests for specified domains.
- 📦 **Environment Variables**: Keep sensitive data secure.

---

## 🔗 Repository Links

- **Frontend Repository**: [_Frontend Repo_](https://github.com/tariqul420/Full-Stack_Setup.git)
- **Backend Repository**: This repository serves as the main full-stack setup and includes the `backend` setup.

---

## Prerequisites

Before running the server, ensure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **MongoDB** (Cloud or Local Instance)
- **npm** (Comes with Node.js)

---

## Installation

1. Clone the client-side repository:

   ```bash
   git clone https://github.com/tariqul420/Full-Stack_Server_Setup.git
   cd Service-Orbit-Server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node index.js
   ```

   --- OR ---

   > **Note** Note: Ensure `nodemon` is installed globally or locally in your project. To install it globally, run:

   ```bash
   nodemon index.js
   ```

4. Open the project in a code editor:
   ```bash
   code .
   ```
5. Add the `.env` file in the root directory and include the following environment variables:
   ```bash
   DATABASE_USERNAME=YOUR_DATABASE_USERNAME
   DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD
   ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
   ```
   > **Note:** Replace the `index.js` file's `your_mongo_connection_string` and the `.env` file's `YOUR_DATABASE_USERNAME`, `YOUR_DATABASE_PASSWORD`, and `YOUR_ACCESS_TOKEN_SECRET` with actual values.
