import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"

export default function TaskDetails() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [taskStatus, setTaskStatus] = useState("not-started")
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 45, seconds: 0 })
  const navigate = useNavigate()
  const { user: authUser, logout } = useAuth()
  const { taskId } = useParams()

  useEffect(() => {
    // Check if user is authenticated
    if (!authUser) {
      navigate("/login")
      return
    }

    setUser(authUser)
  }, [authUser, navigate])

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 }
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 }
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 }
        } else {
          return { hours: 0, minutes: 0, seconds: 0 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleStatusUpdate = (status) => {
    setTaskStatus(status)
    // Handle status update logic here
    console.log("Task status updated to:", status)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  // Mock task data - in real app, fetch based on taskId
  const task = {
    id: taskId || "1",
    name: "ICT System Dashboard screen Bug",
    date: "August 7th, 2025",
    description: "I noticed when you click on the check in button on the dashboard screen, its not working. Please fix asap",
    deadline: "3 Hours : 45 Minutes",
    attachments: [
      "ICT System Dashboard brief.pdf",
      "ICT System Dashboard Additional File.pdf"
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      <DashboardNavbar 
        user={user} 
        onLogout={handleLogout}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        user={user}
      />
      
      <main className="p-4 space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900">Task details</h1>

        {/* Task Information Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600">{task.name}</h2>
          <p className="text-gray-600">{task.date}</p>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {task.description}
              <span className="text-blue-600 ml-1 cursor-pointer hover:underline">more</span>
            </p>
          </div>

          {/* Attached Files */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Attached Files</h3>
            <div className="space-y-2">
              {task.attachments.map((file, index) => (
                <div key={index} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="text-sm">{file}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Deadline Section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Task Deadline</h3>
          <p className="text-gray-700">{task.deadline}</p>
        </div>

        {/* Update Task Status Section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Update Task Status</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => handleStatusUpdate("not-started")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                taskStatus === "not-started"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Not started
            </button>
            <button
              onClick={() => handleStatusUpdate("ongoing")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                taskStatus === "ongoing"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => handleStatusUpdate("completed")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                taskStatus === "completed"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Countdown Section */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">Countdown to task deadline</h3>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs text-gray-500 uppercase">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700">:</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs text-gray-500 uppercase">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700">:</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs text-gray-500 uppercase">Seconds</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
