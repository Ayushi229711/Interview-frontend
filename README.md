# AI Interview Prep Platform - Frontend

A modern React-based frontend for the AI Interview Prep Platform that helps users practice interviews, receive AI-generated feedback, and track their interview performance.

## Features

- User Registration & Login
- JWT Authentication
- Protected Routes
- Start AI-Powered Interviews
- Role-Based Interview Questions
- Submit Answers
- AI Performance Analysis
- Interview History
- Detailed Interview Reports
- Responsive UI with Bootstrap

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- Vite

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- MySQL
- Gemini AI API

## Project Structure

src/
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ └── ProtectedRoute.jsx
│
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Dashboard.jsx
│ ├── StartInterview.jsx
│ ├── Interview.jsx
│ ├── Result.jsx
│ └── History.jsx
│
├── services/
│ └── api.js
│
├── App.jsx
└── main.jsx

## Installation

### Clone Repository

```bash
git clone https://github.com/Ayushi229711/Interview-frontend.git
cd Interview-frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will run on:

```text
http://localhost:5173
```

## Screens

- Login Page
- Register Page
- Dashboard
- Start Interview
- Interview Session
- Interview Result
- Interview History

## API Integration

Frontend communicates with the Spring Boot backend using Axios.

Example:

```javascript
API.post("/interview/start", {
  role,
  difficulty
});
```

## Authentication

JWT token is stored in localStorage.

```javascript
localStorage.setItem("token", token);
```

Protected routes are secured using:

```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## Future Enhancements

- Dark Mode
- Voice-Based Interviews
- AI Mock Interview Assistant
- Interview Analytics Dashboard
- PDF Report Download
- Leaderboard & Progress Tracking

## Author

Ayushi Sachan
