import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"

export default function Attendance() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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

  const handleClockIn = () => {
    // Handle clock in logic here
    console.log("Clock In")
  }

  const handleClockOut = () => {
    // Handle clock out logic here
    console.log("Clock Out")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const attendanceHistory = [
    {
      id: 1,
      date: "8th August, 2025",
      type: "Clocked IN",
      time: "8:35 AM",
      iconColor: "bg-blue-500"
    },
    {
      id: 2,
      date: "8th August, 2025",
      type: "Clocked OUT",
      time: "5:35 PM",
      iconColor: "bg-orange-500"
    },
    {
      id: 3,
      date: "8th August, 2025",
      type: "Clocked IN",
      time: "8:35 AM",
      iconColor: "bg-blue-500"
    },
    {
      id: 4,
      date: "8th August, 2025",
      type: "Clocked OUT",
      time: "5:35 PM",
      iconColor: "bg-orange-500"
    },
    {
      id: 5,
      date: "8th August, 2025",
      type: "Clocked IN",
      time: "8:35 AM",
      iconColor: "bg-blue-500"
    },
    {
      id: 6,
      date: "8th August, 2025",
      type: "Clocked OUT",
      time: "5:35 PM",
      iconColor: "bg-orange-500"
    }
  ]

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
      
      <main className="p-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Attendance</h1>

        {/* Check In Streak Section */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Check In Streak</h2>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 111.06-1.06l1.591 1.591a.75.75 0 010 1.06zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 111.06-1.06l1.591 1.591a.75.75 0 010 1.06zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 01-1.061 0l-1.591-1.591a.75.75 0 10-1.06 1.06l1.591 1.591a.75.75 0 001.06 0zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 001.06-1.06l1.591 1.591a.75.75 0 010 1.06z" />
              </svg>
              <span className="text-blue-600 font-semibold">4 Days</span>
            </div>
          </div>
          
          {/* Days of the week */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
            <div className="flex justify-between">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
          
          {/* Clock In/Out Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleClockIn}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Clock In
            </button>
            <button
              onClick={handleClockOut}
              className="flex-1 bg-white text-blue-600 py-2 px-4 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Clock Out
            </button>
          </div>
        </div>

        {/* Attendance History Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Attendance History</h2>
          
          {/* Filters */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="All time"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="All"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Attendance Records List */}
          <div className="space-y-0">
            {attendanceHistory.map((record, index) => (
              <div key={record.id}>
                <div className="flex items-center space-x-3 py-4">
                  {/* Status Icon */}
                  <div className={`w-8 h-8 ${record.iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  {/* Record Details */}
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{record.date}</p>
                    <p className="text-gray-600 text-sm">{record.type} {record.time}</p>
                  </div>
                </div>
                
                {/* Divider - Show for all except last item */}
                {index < attendanceHistory.length - 1 && (
                  <div className="border-t border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            <button className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">1</button>
            <button className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300">2</button>
            <button className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300">3</button>
            
            <span className="text-gray-500">...</span>
            
            <button className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300">16</button>
            
            <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
