import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"
import ProfilePanel from "../components/ProfilePanel"
import Footer from "../components/Footer"

export default function GuestDetails() {
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

  const handlePrintPasscard = () => {
    // Navigate to the passcard page
    navigate(`/dashboard/guest/${guestId}/passcard`)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  // Mock guest data - in real app, fetch based on guestId
  const guest = {
    id: guestId || "1",
    name: "James Ogunmepon",
    email: "jamesogunmepon556@gmail.com",
    region: "44",
    province: "Ogun province 21",
    guestType: "Teenager"
  }

  return (
    <div className="min-h-screen bg-white">
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
        <div className="max-w-md mx-auto bg-white rounded-t-3xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Profile Picture Section */}
          <div className="flex justify-center pt-6 pb-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
              {/* Placeholder Avatar - Replace with actual image */}
                <img src="/avatar.svg" alt="Avatar" className="w-24 h-24" />
            </div>
          </div>

          {/* Guest Information */}
          <div className="px-6 pb-6">
            {/* Name and Email */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{guest.name}</h2>
              <p className="text-gray-600 text-sm">{guest.email}</p>
            </div>

            {/* Guest Details */}
            <div className="space-y-3 mb-6">
              <div className="flex gap-1">
                <span className="text-gray-700">Region: </span>
                <span className="text-gray-900">{guest.region}</span>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-700">Province: </span>
                <span className="text-gray-900">{guest.province}</span>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-700">Guest Type: </span>
                <span className="text-gray-900">{guest.guestType}</span>
              </div>
            </div>

            {/* Access Note */}
            <div className="mb-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-bold">NOTE:</span> Your guest access is limited to 1 hour in the ICT department workspace.
              </p>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrintPasscard}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Print Passcard
            </button>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="max-w-md mx-auto mt-6 space-y-3">
          <button
            onClick={() => navigate("/dashboard/my-guest")}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Back to Guest List
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
