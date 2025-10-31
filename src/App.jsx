import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Notifications from "./pages/Notifications"
import MyGuest from "./pages/MyGuest"
import Attendance from "./pages/Attendance"
import MyTask from "./pages/MyTask"
import TaskDetails from "./pages/TaskDetails"
import GuestDetails from "./pages/GuestDetails"
import GuestPasscard from "./pages/GuestPasscard"
import Profile from "./pages/Profile"
import AssignedTask from "./pages/AssignedTask"
import SubunitHub from "./pages/SubunitHub"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/notifications" element={<Notifications />} />
      <Route path="/dashboard/my-guest" element={<MyGuest />} />
      <Route path="/dashboard/attendance" element={<Attendance />} />
      <Route path="/dashboard/my-task" element={<MyTask />} />
      <Route path="/dashboard/assigned-task" element={<AssignedTask />} />
      <Route path="/dashboard/subunit-hub" element={<SubunitHub />} />
      <Route path="/dashboard/task/:taskId" element={<TaskDetails />} />
      <Route path="/dashboard/guest/:guestId" element={<GuestDetails />} />
      <Route path="/dashboard/guest/:guestId/passcard" element={<GuestPasscard />} />
      <Route path="/dashboard/profile" element={<Profile />} />
    </Routes>
  )
}