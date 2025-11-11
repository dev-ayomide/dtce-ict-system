import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"
import ProfilePanel from "../components/ProfilePanel"
import Footer from "../components/Footer"

export default function Notifications() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
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

  const notifications = [
    {
      id: 1,
      message: "Hey Ayomide, you've got a new task. Check your dashboard to complete the task",
      timestamp: "2 hours ago",
      icon: "megaphone"
    },
    {
      id: 2,
      message: "Hey Ayomide, you've got a new task. Check your dashboard to complete the task",
      timestamp: "2 hours ago",
      icon: "megaphone"
    },
    {
      id: 3,
      message: "Hey Ayomide, you've got a new task. Check your dashboard to complete the task",
      timestamp: "2 hours ago",
      icon: "megaphone"
    },
    {
      id: 4,
      message: "Hey Ayomide, you've got a new task. Check your dashboard to complete the task",
      timestamp: "2 hours ago",
      icon: "megaphone"
    },
    {
      id: 5,
      message: "Hey Ayomide, you've got a new task. Check your dashboard to complete the task",
      timestamp: "2 hours ago",
      icon: "megaphone"
    }
  ]

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h1>

        {/* Notifications List */}
        <div className="space-y-0">
          {notifications.map((notification, index) => (
            <div key={notification.id}>
              <div className="flex items-start space-x-3 py-4">
                {/* Notification Icon */}
                <div className="flex-shrink-0 mt-1">
                  <img src="/megaphone.svg" alt="Notification" className="w-5 h-5 text-gray-900 dark:text-white" />
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    {notification.timestamp}
                  </p>
                </div>
              </div>

              {/* Divider - Show for all except last item */}
              {index < notifications.length - 1 && (
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
