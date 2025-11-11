import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"
import ProfilePanel from "../components/ProfilePanel"
import Footer from "../components/Footer"

export default function Attendance() {
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

  const handleClockIn = () => {
    // Handle clock in logic here
    console.log("Clock In")
  }

  const handleClockOut = () => {
    // Handle clock out logic here
    console.log("Clock Out")
  }

  if (!user) {
    return <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-white">Loading...</div>
  }

  const attendanceHistory = [
    {
      id: 1,
      date: "8th August, 2025",
      type: "Clocked IN",
      time: "8:35 AM",
      iconBg: "bg-[#e1eaff]"
    },
    {
      id: 2,
      date: "8th August, 2025",
      type: "Clocked OUT",
      time: "8:35 AM",
      iconBg: "bg-[#ffefe1]"
    },
    {
      id: 3,
      date: "8th August, 2025",
      type: "Clocked IN",
      time: "8:35 AM",
      iconBg: "bg-[#e1eaff]"
    },
    {
      id: 4,
      date: "8th August, 2025",
      type: "Clocked OUT",
      time: "8:35 AM",
      iconBg: "bg-[#ffefe1]"
    },
    {
      id: 5,
      date: "8th August, 2025",
      type: "Clocked IN",
      time: "8:35 AM",
      iconBg: "bg-[#e1eaff]"
    },
    {
      id: 6,
      date: "8th August, 2025",
      type: "Clocked OUT",
      time: "8:35 AM",
      iconBg: "bg-[#ffefe1]"
    }
  ]

  // Days of the week with check-in status
  const weekDays = [
    { label: "S", checked: true },
    { label: "M", checked: true },
    { label: "T", checked: true },
    { label: "W", checked: true },
    { label: "T", checked: false },
    { label: "F", checked: false },
    { label: "S", checked: false }
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
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-6">Attendance</h1>

        {/* Check In Streak Section */}
        <div className="bg-[#f8f8f8] dark:bg-gray-800 rounded-[15px] p-6 mb-6">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-black dark:text-white">Check In Streak</h2>
            <div className="flex items-center gap-1.5">
              {/* Fire icon */}
              <svg className="w-5 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.59 10.12 16.35 9.85 16.2 9.55C15.9 9.25 15.7 8.94 15.6 8.6C15.5 8.26 15.45 7.93 15.45 7.6C15.45 7.2 15.5 6.8 15.6 6.4C15.7 6 15.85 5.65 16.05 5.35C16.25 5.05 16.5 4.8 16.8 4.6C17.1 4.4 17.45 4.25 17.85 4.15C18.25 4.05 18.65 4 19.05 4C19.45 4 19.85 4.05 20.25 4.15C20.65 4.25 21 4.4 21.3 4.6C21.6 4.8 21.85 5.05 22.05 5.35C22.25 5.65 22.4 6 22.5 6.4C22.6 6.8 22.65 7.2 22.65 7.6C22.65 7.93 22.6 8.26 22.5 8.6C22.4 8.94 22.2 9.25 21.9 9.55C21.75 9.85 21.51 10.12 21.21 10.38C20.95 10.64 20.67 10.9 20.44 11.2C20.21 11.5 20.05 11.8 19.95 12.1C19.85 12.4 19.8 12.7 19.8 13C19.8 13.3 19.85 13.6 19.95 13.9C20.05 14.2 20.21 14.5 20.44 14.8C20.67 15.1 20.95 15.36 21.21 15.62C21.51 15.88 21.75 16.15 21.9 16.45C22.2 16.75 22.4 17.06 22.5 17.4C22.6 17.74 22.65 18.07 22.65 18.4C22.65 18.8 22.6 19.2 22.5 19.6C22.4 20 22.25 20.35 22.05 20.65C21.85 20.95 21.6 21.2 21.3 21.4C21 21.6 20.65 21.75 20.25 21.85C19.85 21.95 19.45 22 19.05 22C18.65 22 18.25 21.95 17.85 21.85C17.45 21.75 17.1 21.6 16.8 21.4C16.5 21.2 16.25 20.95 16.05 20.65C15.85 20.35 15.7 20 15.6 19.6C15.5 19.2 15.45 18.8 15.45 18.4C15.45 18.07 15.5 17.74 15.6 17.4C15.7 17.06 15.9 16.75 16.2 16.45C16.35 16.15 16.59 15.88 16.89 15.62C17.15 15.36 17.43 15.1 17.66 14.8C17.89 14.5 18.05 14.2 18.15 13.9C18.25 13.6 18.3 13.3 18.3 13C18.3 12.7 18.25 12.4 18.15 12.1C18.05 11.8 17.89 11.5 17.66 11.2Z"/>
              </svg>
              <span className="text-lg font-semibold text-[#0153FD] dark:text-blue-400">4 Days</span>
            </div>
          </div>
          
          {/* Days of the week - Calendar Grid */}
          <div className="flex justify-center gap-4 mb-6">
            {weekDays.map((day, index) => (
              <div key={`${day.label}-${index}`} className="flex flex-col items-center gap-2">
                <span className="text-sm font-semibold text-black dark:text-white">{day.label}</span>
                <div className={`w-4 h-4 rounded-sm ${day.checked ? 'bg-[#0153FD]' : 'bg-[#d9d9d9] dark:bg-gray-600'}`}></div>
              </div>
            ))}
          </div>
          
          {/* Clock In/Out Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleClockIn}
              className="bg-[#0153FD] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Clock In
            </button>
            <button
              onClick={handleClockOut}
              className="bg-white dark:bg-gray-800 border border-[#0153FD] dark:border-blue-400 text-[#0153FD] dark:text-blue-400 px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              Clock Out
            </button>
          </div>
        </div>

        {/* Attendance History Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-6">Attendance History</h2>
          
          {/* Filters */}
          <div className="bg-[#f8f8f8] dark:bg-gray-800 rounded-[15px] p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              {/* Date Range Filter */}
              <div className="flex flex-col gap-3 flex-1 w-full">
                <label className="text-base font-semibold text-black dark:text-white">Date Range</label>
                <div className="relative w-full">
                  <div className="bg-[rgba(0,0,0,0.02)] dark:bg-gray-700 border border-[#e0e0e0] dark:border-gray-600 rounded-xl h-14 flex items-center justify-between px-5 w-full">
                    <span className="text-sm text-[#878787] dark:text-gray-400">All time</span>
                    <svg className="w-5 h-5 text-[#878787] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Attendance Type Filter */}
              <div className="flex flex-col gap-3 flex-1 w-full">
                <label className="text-base font-semibold text-black dark:text-white">Attendance type</label>
                <div className="relative w-full">
                  <div className="bg-[rgba(0,0,0,0.02)] dark:bg-gray-700 border border-[#e0e0e0] dark:border-gray-600 rounded-xl h-14 flex items-center justify-between px-5 w-full">
                    <span className="text-sm text-[#878787] dark:text-gray-400">All</span>
                    <svg className="w-5 h-5 text-[#878787] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Attendance Records List */}
          <div className="space-y-0 mb-12">
            {attendanceHistory.map((record, index) => (
              <div key={record.id}>
                <div className="flex items-start gap-[10px] py-4">
                  {/* Status Icon */}
                  <div className={`w-10 h-10 ${record.iconBg} rounded-[22.5px] flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  {/* Record Details */}
                  <div className="flex-1">
                    <p className="text-base font-semibold text-[#020202] dark:text-white mb-1">{record.date}</p>
                    <p className="text-sm text-[#4a4a4a] dark:text-gray-300">{record.type} {record.time}</p>
                  </div>
                </div>
                
                {/* Divider - Show for all except last item */}
                {index < attendanceHistory.length - 1 && (
                  <div className="border-t border-gray-200 dark:border-gray-700"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center gap-[17px]">
            <button className="border border-[#0153FD] dark:border-blue-400 px-4 py-2 rounded-full text-xs font-semibold text-black dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
              &lt;
            </button>
            
            <button className="bg-[#f6f6f6] dark:bg-gray-800 px-4 py-2 rounded-full text-xs font-semibold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              1
            </button>
            <button className="bg-[#f6f6f6] dark:bg-gray-800 px-4 py-2 rounded-full text-xs font-semibold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="bg-[#f6f6f6] dark:bg-gray-800 px-4 py-2 rounded-full text-xs font-semibold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              3
            </button>
            
            <span className="text-black dark:text-white">...</span>
            
            <button className="bg-[#f6f6f6] dark:bg-gray-800 px-4 py-2 rounded-full text-xs font-semibold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              16
            </button>
            
            <button className="bg-[#0153FD] border border-[#0153FD] px-4 py-2 rounded-full text-xs font-semibold text-white hover:bg-blue-700 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
