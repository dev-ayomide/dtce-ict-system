import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"
import ProfilePanel from "../components/ProfilePanel"
import Footer from "../components/Footer"

export default function MyTask() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const navigate = useNavigate()
  const { user: authUser, logout } = useAuth()

  useEffect(() => {
    // Check if user is authenticated
    if (!authUser) {
      navigate("/login")
      return
    }

    setUser(authUser)
  }, [authUser, navigate])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  if (!user) {
    return <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-white">Loading...</div>
  }

  const tasks = [
    {
      id: 1,
      timestamp: "Task assigned 5 hours ago",
      title: "ICT System Dashboard screen Bug",
      assignee: "Job Assigned by Sub Unit head",
      description: "I noticed when you click on the check in button on the dashboard screen, its not working. Please fix asap",
      status: "pending"
    },
    {
      id: 2,
      timestamp: "Task assigned 5 hours ago",
      title: "ICT System Dashboard screen Bug",
      assignee: "Job Assigned by Sub Unit head",
      description: "I noticed when you click on the check in button on the dashboard screen, its not working. Please fix asap",
      status: "pending"
    },
    {
      id: 3,
      timestamp: "Task assigned 5 hours ago",
      title: "ICT System Dashboard screen Bug",
      assignee: "Job Assigned by Sub Unit head",
      description: "I noticed when you click on the check in button on the dashboard screen, its not working. Please fix asap",
      status: "pending"
    },
    {
      id: 4,
      timestamp: "Task assigned 5 hours ago",
      title: "ICT System Dashboard screen Bug",
      assignee: "Job Assigned by Sub Unit head",
      description: "I noticed when you click on the check in button on the dashboard screen, its not working. Please fix asap",
      status: "pending"
    },
    {
      id: 5,
      timestamp: "Task assigned 5 hours ago",
      title: "ICT System Dashboard screen Bug",
      assignee: "Job Assigned by Sub Unit head",
      description: "I noticed when you click on the check in button on the dashboard screen, its not working. Please fix asap",
      status: "pending"
    }
  ]

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case "pending":
        return tasks.filter(task => task.status === "pending")
      case "completed":
        return tasks.filter(task => task.status === "completed")
      default:
        return tasks
    }
  }

  const filteredTasks = getFilteredTasks()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <DashboardNavbar 
        user={user} 
        onLogout={handleLogout}
        onMenuToggle={() => {
          setIsProfileOpen(false)
          setIsSidebarOpen(!isSidebarOpen)
        }}
        onProfileToggle={() => {
          setIsSidebarOpen(false)
          setIsProfileOpen(!isProfileOpen)
        }}
      />
      
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        user={user}
      />
      
      <ProfilePanel 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
      
      <main className="px-4 md:px-8 lg:px-16 pt-20 pb-4 md:pb-8 max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Task</h1>

        {/* Task Filters */}
        <div className="flex justify-center space-x-2 mb-6">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "all"
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "pending"
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Pending (0)
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "completed"
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Completed (0)
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-0">
          {filteredTasks.map((task, index) => (
            <Link key={task.id} to={`/dashboard/task/${task.id}`} className="block">
              <div className="py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {/* Timestamp */}
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">{task.timestamp}</p>
                
                {/* Task Title */}
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{task.title}</h3>
                
                {/* Assignee */}
                <p className="text-gray-900 dark:text-gray-200 text-sm mb-2">{task.assignee}</p>
                
                {/* Description */}
                <p className="text-gray-900 dark:text-gray-200 text-sm leading-relaxed">
                  {task.description}
                  <span className="text-blue-600 dark:text-blue-400 ml-1 cursor-pointer hover:underline">more</span>
                </p>
              </div>
              
              {/* Divider - Show for all except last item */}
              {index < filteredTasks.length - 1 && (
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
              )}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
