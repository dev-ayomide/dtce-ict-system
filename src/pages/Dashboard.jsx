import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 52, seconds: 39 })
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

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "GOOD MORNING"
    if (hour < 17) return "GOOD AFTERNOON"
    return "GOOD EVENING"
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
      />
      
      <main className="p-4 space-y-6">
        {/* Logo and Greeting Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 111.06-1.06l1.591 1.591a.75.75 0 010 1.06zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 111.06-1.06l1.591 1.591a.75.75 0 010 1.06zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 01-1.061 0l-1.591-1.591a.75.75 0 10-1.06 1.06l1.591 1.591a.75.75 0 001.06 0zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 001.06-1.06l1.591 1.591a.75.75 0 010 1.06z" />
              </svg>
              <span className="text-sm  text-gray-900">{getGreeting()}, {user?.name?.split(' ')[0]?.toUpperCase() || 'USER'}</span>
            </div>
          </div>
        </div>

        {/* Activity Tracker */}
        <div className="bg-[#E6F0FF] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Activity Tracker</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-black">My Task</span>
              <span className="text-md font-bold text-gray-900">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black">Ongoing Task</span>
              <span className="text-md font-bold text-gray-900">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black">Completed Task</span>
              <span className="text-md font-bold text-gray-900">1</span>
            </div>
          </div>
        </div>

        {/* Countdown Section */}
        <div className="bg-[#D0E3FF] rounded-2xl p-6">
          <h2 className="text-lg text-center font-bold text-gray-900 mb-4">Countdown to task deadline</h2>
          <div className="text-center">
            <div className="flex justify-center space-x-2 mb-2">
              <div className="bg-white rounded-lg px-3 py-2 min-w-[60px]">
                <p className="text-2xl font-bold text-gray-900">{timeLeft.hours.toString().padStart(2, '0')}</p>
              </div>
              <div className="text-2xl font-bold text-gray-900">:</div>
              <div className="bg-white rounded-lg px-3 py-2 min-w-[60px]">
                <p className="text-2xl font-bold text-gray-900">{timeLeft.minutes.toString().padStart(2, '0')}</p>
              </div>
              <div className="text-2xl font-bold text-gray-900">:</div>
              <div className="bg-white rounded-lg px-3 py-2 min-w-[60px]">
                <p className="text-2xl font-bold text-gray-900">{timeLeft.seconds.toString().padStart(2, '0')}</p>
              </div>
            </div>
            <div className="flex justify-center space-x-2 text-xs text-gray-500">
              <span className="min-w-[60px] text-center">HOURS</span>
              <span className="min-w-[60px] text-center">MINUTES</span>
              <span className="min-w-[60px] text-center">SECONDS</span>
            </div>
          </div>
        </div>

        {/* Check-in Streak */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Check in Streak</h2>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 111.06-1.06l1.591 1.591a.75.75 0 010 1.06zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 111.06-1.06l1.591 1.591a.75.75 0 010 1.06zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 01-1.061 0l-1.591-1.591a.75.75 0 10-1.06 1.06l1.591 1.591a.75.75 0 001.06 0zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 001.06-1.06l1.591 1.591a.75.75 0 010 1.06z" />
              </svg>
              <span className="text-lg font-semibold text-blue-600">4 Days</span>
            </div>
          </div>
          
          <div className="flex justify-between mb-6">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={day} className="text-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium mb-1 ${
                  index < 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {day}
                </div>
                <p className="text-xs text-gray-500">{index + 1}</p>
              </div>
            ))}
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Clock in
          </button>
        </div>

        {/* My Task */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Task</h2>
          <div className="space-y-3 mb-4">
            {[
              { task: "ICT System bug fix", status: "green" },
              { task: "ICT System bug fix", status: "orange" },
              { task: "ICT System bug fix", status: "gray" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'green' ? 'bg-green-500' : 
                  item.status === 'orange' ? 'bg-orange-500' : 'bg-gray-400'
                }`}></div>
                <span className="text-gray-700">{item.task}</span>
              </div>
            ))}
          </div>
          <button className="text-blue-600 font-medium hover:underline">Show more</button>
        </div>

        {/* My Guest */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Guest</h2>
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <img 
                src="/no-guests.svg" 
                alt="No Guests" 
                className="w-16 h-16"
              />
            </div>
            <p className="text-gray-500 mb-6">Oops you do not have any Guest today.</p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Register a visitor
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
