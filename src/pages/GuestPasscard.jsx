import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"
import ProfilePanel from "../components/ProfilePanel"
import Footer from "../components/Footer"

export default function GuestPasscard() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()
  const { user: authUser, logout } = useAuth()
  const { guestId } = useParams()

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

  const handleDownloadPDF = () => {
    // Handle PDF download logic here
    console.log("Downloading PDF for guest:", guestId)
    // You can implement actual PDF generation here
  }

  const handleDownloadImage = () => {
    // Handle image download logic here
    console.log("Downloading image for guest:", guestId)
    // You can implement actual image generation here
  }

  if (!user) {
    return <div>Loading...</div>
  }

  // Mock guest data - in real app, fetch based on guestId
  const guest = {
    id: guestId || "1",
    name: "James Ogunmepon",
    region: "44",
    province: "Ogun province 21"
  }

  // Get current date and time for the passcard
  const now = new Date()
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const currentDay = dayNames[now.getDay()]
  const currentMonth = monthNames[now.getMonth()]
  const currentDate = now.getDate()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  
  // Set access time (1 hour from now)
  const accessEndTime = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour later
  const endHour = accessEndTime.getHours()
  const endMinute = accessEndTime.getMinutes()

  const formatTime = (hour, minute) => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    const displayMinute = minute.toString().padStart(2, '0')
    return `${displayHour}:${displayMinute} ${period}`
  }

  return (
    <div className="min-h-screen">
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
        {/* Guest Passcard */}
        <div className="max-w-md mx-auto flex justify-center items-center">
          <img
            src="/guest-card.svg"
            alt="Guest Passcard"
            className="w-full h-auto"
            style={{ maxWidth: "100%" }}
          />
        </div>

        {/* Action Buttons */}
        <div className="max-w-md mx-auto mt-8 space-y-3">
          <button
            onClick={handleDownloadPDF}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Download as PDF
          </button>
          
          <button
            onClick={handleDownloadImage}
            className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Download as Image
          </button>

          <button
            onClick={() => navigate(`/dashboard/guest/${guestId}`)}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Back to Guest Details
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
