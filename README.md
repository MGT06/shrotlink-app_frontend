# ShortLink App - Frontend

![React](https://img.shields.io/badge/React-19.3.1-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3.4-646CFF?style=flat&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.13.0-764ABC?style=flat&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3.3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

A modern, enterprise-grade URL shortener frontend application built with React and Redux. Transform long URLs into powerful, trackable digital assets with real-time analytics and team collaboration features.

## Description

ShortLink App Frontend is a sophisticated web application that provides an intuitive interface for managing shortened URLs. Built with modern React practices and state management, it offers seamless user authentication, real-time link management, and comprehensive analytics dashboards. The application emphasizes user experience with responsive design, debounced search, and protected routing.

## Features

### **Authentication & Authorization**
- User registration and login with JWT token management
- Protected routes for authenticated users
- Auth guards preventing logged-in users from accessing auth pages
- Persistent session with Redux Persist

### **Link Management**
- Create custom short links with optional slugs (6 characters)
- Real-time link preview during creation
- Search links with debounced input (500ms)
- Sort links by creation date (ascending/descending)
- Delete links with soft delete functionality
- Copy short links to clipboard
- Pagination support

## Tech Stack

### Core
- **React** 19.3.1 - UI library
- **Vite** 8.3.4 - Build tool and dev server
- **React Router** 8.5.0 - Client-side routing

### State Management
- **Redux Toolkit** 2.13.0 - State management
- **Redux Persist** 6.0.0 - State persistence
- **React Redux** 9.3.0 - React bindings for Redux

### UI & Styling
- **TailwindCSS** 4.3.3 - Utility-first CSS framework
- **Lucide React** 1.61.0 - Icon library
- **React Icons** 5.7.0 - Additional icons

### Forms & Validation
- **React Hook Form** 7.90.0 - Form state management

### HTTP Client
- **Axios** 1.20.0 - HTTP requests

### Development Tools
- **ESLint** 10.13.0 - Code linting

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Backend API running (see Related Project)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shortlink-app_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and update the values:
   ```env
   VITE_API_URL=http://localhost:5050
   VITE_APP_URL=http://localhost:5173
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Assumptions

### **1. Axios Interceptor Approach**

The application uses a centralized Axios interceptor (`src/api/interceptor.js`) for handling HTTP responses, particularly 401 Unauthorized errors. This design decision was made for the following reasons:

#### **Why Interceptor?**
- **Centralized Error Handling**: All API calls automatically handle authentication failures in one place, eliminating repetitive error handling code across components
- **Automatic Token Expiry Management**: When the backend returns 401 (expired/invalid token), the interceptor automatically clears persisted state and redirects to login
- **Separation of Concerns**: Authentication logic is decoupled from business logic in Redux thunks and React components
- **Consistent User Experience**: Users are immediately redirected to login when their session expires, regardless of which API call fails
- **Simplified Redux Thunks**: Thunks focus on data transformation rather than authentication state management


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Project

### Backend API
[ShortLink App - Backend](https://github.com/MGT06/shortlink-app_backend)

The backend API is built with Go and provides RESTful endpoints for:
- User authentication (register, login)
- Link management (create, read, delete)
- Link redirection with 301 HTTP status
- Click tracking and analytics

---
