import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"

export default function Profile() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
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

  const handleGenerateIDCard = () => {
    // Handle ID card generation logic here
    console.log("Generating ID card for user:", user?.id)
    // You can implement actual ID card generation here
  }

  const handleEditProfile = () => {
    setIsEditing(!isEditing)
    // Handle edit profile logic here
    console.log("Editing profile for user:", user?.id)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  // Mock user data - in real app, use actual user data from auth context
  const profileData = {
    name: "TAIWO AYOMIDE",
    email: "ayomide@gmail.com",
    province: "OGUN PROVINCE 21",
    region: "REGION 44",
    subunit: "TECHNICAL"
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
      
      <main className="p-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

        {/* Profile Section */}
        <div className="max-w-md mx-auto text-center mb-8">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {/* Placeholder Avatar - Replace with actual image */}
            <div className="w-full h-full flex items-center justify-center">
              <img src="/avatar.svg" alt="Avatar" className="w-24 h-24" />
            </div>
          </div>

          {/* Name and Role */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">TAIWO AYOMIDE</h2>
          <p className="text-gray-600">Technical</p>
        </div>

        {/* Personal Information Section */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
            <button
              onClick={handleEditProfile}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>

          {/* Information Fields */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Name</span>
              <span className="text-gray-900 font-medium">{profileData.name}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Email Address</span>
              <span className="text-gray-900 font-medium">{profileData.email}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Province</span>
              <span className="text-gray-900 font-medium">{profileData.province}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Region</span>
              <span className="text-gray-900 font-medium">{profileData.region}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Subunit</span>
              <span className="text-gray-900 font-medium">{profileData.subunit}</span>
            </div>
          </div>

          {/* Generate ID Card Button */}
          <button
            onClick={handleGenerateIDCard}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Generate My ID Card
          </button>
        </div>
      </main>
    </div>
  )
}
