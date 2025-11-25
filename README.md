# DTCE ICT System

A comprehensive ICT management system for the DTCE department, built with React and Vite. This system manages tasks, guest passes, attendance tracking, and subunit coordination.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Status](#project-status)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [What's Been Done](#whats-been-done)
- [What's Left to Do](#whats-left-to-do)
- [Development Guidelines](#development-guidelines)
- [API Integration Points](#api-integration-points)

## 🎯 Project Overview

The DTCE ICT System is a web application designed to streamline ICT department operations including:
- **Task Management**: Assign, track, and manage tasks for ICT members
- **Guest Management**: Generate and manage guest passcards for visitors
- **Attendance Tracking**: Clock in/out functionality with streak tracking
- **Subunit Coordination**: Manage subunits and their activities
- **Notifications**: Real-time notifications for important updates

## 🛠 Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 7.8.1
- **Styling**: Tailwind CSS 4.1.12
- **State Management**: React Context API
- **Development**: ESLint for code quality

## ✨ Features

### Implemented (Frontend Only)
- ✅ Landing page with hero section
- ✅ User authentication UI (mock)
- ✅ Dashboard with activity tracker
- ✅ Task management interface
- ✅ Guest passcard generation form
- ✅ Attendance tracking UI
- ✅ Profile management
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Navigation and routing

### Pending (Backend Integration)
- ⏳ Real authentication with backend
- ⏳ API integration for all features
- ⏳ Real-time data fetching
- ⏳ File upload functionality
- ⏳ Notification system
- ⏳ Data persistence

## 📊 Project Status

**Current Status**: Frontend UI/UX Complete - Ready for Backend Integration

The frontend is fully implemented with mock data. All pages, components, and user flows are complete. The next phase involves integrating with a backend API to make the application fully functional.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dtce-ict-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
dtce-ict-system/
├── public/                 # Static assets (images, SVGs)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── About.jsx
│   │   ├── Community.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── DashboardNavbar.jsx
│   │   ├── DashboardSidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProfilePanel.jsx
│   │   └── Subunit.jsx
│   ├── context/           # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/             # Page components
│   │   ├── AssignedTask.jsx
│   │   ├── Attendance.jsx
│   │   ├── Dashboard.jsx
│   │   ├── GuestDetails.jsx
│   │   ├── GuestPasscard.jsx
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── MyGuest.jsx
│   │   ├── MyTask.jsx
│   │   ├── Notifications.jsx
│   │   ├── Profile.jsx
│   │   ├── SubunitHub.jsx
│   │   └── TaskDetails.jsx
│   ├── App.jsx            # Main app component with routes
│   ├── App.css            # Global styles
│   ├── main.jsx           # Entry point
│   └── index.css          # Base styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## ✅ What's Been Done

### Authentication & Authorization
- ✅ Login page UI with form validation
- ✅ AuthContext for managing authentication state
- ✅ Protected routes (redirects to login if not authenticated)
- ✅ User session management with localStorage
- ⚠️ **Note**: Currently using mock authentication - needs backend integration

### Dashboard
- ✅ Main dashboard with greeting based on time of day
- ✅ Activity tracker showing task counts
- ✅ Countdown timer for task deadlines
- ✅ Task list with status indicators
- ✅ Check-in streak visualization
- ✅ My Guest section
- ✅ Role-based UI (Subunit Head vs ICT Member)

### Task Management
- ✅ My Task page with filtering (All, Pending, Completed)
- ✅ Assigned Task page (for Subunit Heads)
- ✅ Task Details page with:
  - Task information display
  - Status update functionality
  - File upload interface
  - Task completion submission
- ⚠️ **Note**: All task data is currently mock - needs API integration

### Guest Management
- ✅ Guest registration form with validation
- ✅ Guest history list
- ✅ Guest details modal
- ✅ Guest passcard generation page
- ✅ Guest details page
- ⚠️ **Note**: Guest data is hardcoded - needs backend integration

### Attendance
- ✅ Attendance page with check-in/out buttons
- ✅ Check-in streak calendar visualization
- ✅ Attendance history list
- ✅ Date range and type filters
- ✅ Pagination UI
- ⚠️ **Note**: Attendance data is mock - needs backend integration

### Profile & Settings
- ✅ Profile page
- ✅ Profile panel component
- ✅ Theme toggle (Dark/Light mode)
- ✅ User information display

### UI/UX
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark mode support throughout
- ✅ Consistent design system
- ✅ Loading states
- ✅ Form validation
- ✅ Navigation and routing
- ✅ Footer component
- ✅ Landing page with hero section

## ⏳ What's Left to Do

### Backend Integration (Priority)

1. **Authentication API**
   - [ ] Replace mock login with real API call
   - [ ] Implement JWT token handling
   - [ ] Add token refresh mechanism
   - [ ] Handle authentication errors

2. **Task Management API**
   - [ ] Fetch tasks from backend
   - [ ] Create new tasks (Subunit Heads)
   - [ ] Update task status
   - [ ] Submit task completion with files
   - [ ] Real-time task updates

3. **Guest Management API**
   - [ ] Submit guest registration form
   - [ ] Fetch guest history
   - [ ] Generate guest passcard (backend)
   - [ ] Guest passcard PDF generation

4. **Attendance API**
   - [ ] Clock in/out functionality
   - [ ] Fetch attendance history
   - [ ] Calculate check-in streak
   - [ ] Filter attendance records

5. **Notifications API**
   - [ ] Fetch notifications
   - [ ] Mark notifications as read
   - [ ] Real-time notification updates

6. **Profile API**
   - [ ] Fetch user profile
   - [ ] Update user profile
   - [ ] Upload profile picture

7. **Subunit Hub API**
   - [ ] Fetch subunit members
   - [ ] Subunit activity tracking

### Additional Features

- [ ] Error handling and error boundaries
- [ ] Loading states for all API calls
- [ ] Optimistic UI updates
- [ ] File upload functionality
- [ ] PDF generation for guest passcards
- [ ] Real-time updates (WebSocket or polling)
- [ ] Form validation improvements
- [ ] Accessibility improvements
- [ ] Unit tests
- [ ] Integration tests

## 📝 Development Guidelines

### ⚠️ IMPORTANT: Code Comments

**CRITICAL INSTRUCTION**: 
- **ALWAYS** read comments before writing new code
- Comments contain important context, explanations, and instructions
- If you need to understand a section, read the comments first

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Maintain consistent naming conventions
- Keep components focused and reusable

### File Organization

- Components in `src/components/`
- Pages in `src/pages/`
- Context providers in `src/context/`
- Keep related files together

### State Management

- Use Context API for global state (Auth, Theme)
- Use local state for component-specific state
- Consider adding state management library if needed

### API Integration Pattern

When integrating APIs, follow this pattern:

```javascript
// Example API integration pattern
const fetchData = async () => {
  setIsLoading(true)
  try {
    const response = await fetch('/api/endpoint', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setData(data)
  } catch (error) {
    console.error('Error:', error)
    // Handle error
  } finally {
    setIsLoading(false)
  }
}
```

## 🔌 API Integration Points

### Authentication Endpoints Needed

```
POST   /api/auth/login          - User login
POST   /api/auth/logout         - User logout
POST   /api/auth/refresh        - Refresh token
GET    /api/auth/me             - Get current user
```

### Task Endpoints Needed

```
GET    /api/tasks               - Get all tasks (filtered by user role)
GET    /api/tasks/:id           - Get task details
POST   /api/tasks               - Create new task (Subunit Head only)
PUT    /api/tasks/:id           - Update task
PUT    /api/tasks/:id/status    - Update task status
POST   /api/tasks/:id/complete  - Submit task completion with files
```

### Guest Endpoints Needed

```
GET    /api/guests              - Get guest history
POST   /api/guests              - Register new guest
GET    /api/guests/:id          - Get guest details
GET    /api/guests/:id/passcard - Generate/download passcard PDF
```

### Attendance Endpoints Needed

```
POST   /api/attendance/clock-in  - Clock in
POST   /api/attendance/clock-out - Clock out
GET    /api/attendance          - Get attendance history (with filters)
GET    /api/attendance/streak   - Get check-in streak
```

### Notification Endpoints Needed

```
GET    /api/notifications       - Get notifications
PUT    /api/notifications/:id/read - Mark as read
GET    /api/notifications/unread-count - Get unread count
```

### Profile Endpoints Needed

```
GET    /api/profile             - Get user profile
PUT    /api/profile             - Update user profile
POST   /api/profile/avatar      - Upload profile picture
```

### Subunit Endpoints Needed

```
GET    /api/subunits            - Get subunits
GET    /api/subunits/:id        - Get subunit details
GET    /api/subunits/:id/members - Get subunit members
```


## 📦 Dependencies

### Production Dependencies
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `react-scroll` - Smooth scrolling
- `tailwindcss` - CSS framework

### Development Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Linting
- `@tailwindcss/vite` - Tailwind CSS plugin

## 🤝 Contributing

When working on this project:

1. Read all comments in the codebase before making changes
2. Follow the existing code style
3. Test your changes thoroughly
4. Ensure responsive design works on all screen sizes


## 👤 Author

Ayomide Taiwo

---

**Note**: This project is ready for backend integration. All frontend components are complete and functional with mock data. The next developer should focus on replacing mock data with real API calls following the patterns outlined in this documentation.
