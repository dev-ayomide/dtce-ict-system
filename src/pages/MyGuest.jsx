import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"

export default function MyGuest() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { user: authUser, logout } = useAuth()

  // Form state
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guestType, setGuestType] = useState("")
  const [region, setRegion] = useState("")
  const [province, setProvince] = useState("")

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

  const handleGenerate = (e) => {
    e.preventDefault()
    // Handle guest passcard generation logic here
    console.log("Generating passcard for:", { guestName, guestEmail, guestType, region, province })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const guestHistory = [
    {
      id: 1,
      name: "James Ogunmepon",
      email: "jamesogunmepon556@gmail.com",
      location: "Region 44 | Ogun province 21"
    },
    {
      id: 2,
      name: "James Ogunmepon",
      email: "jamesogunmepon556@gmail.com",
      location: "Region 44 | Ogun province 21"
    },
    {
      id: 3,
      name: "James Ogunmepon",
      email: "jamesogunmepon556@gmail.com",
      location: "Region 44 | Ogun province 21"
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
        {/* Guest Passcard Generation Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Guest</h1>
          <p className="text-gray-600 mb-6">Generate your guest passcard</p>
          
          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Guest Name */}
            <input
              type="text"
              placeholder="Input Guest Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            
            {/* Guest Email */}
            <input
              type="email"
              placeholder="Guest Email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            
            {/* Guest Type */}
            <input
              type="text"
              placeholder="Guest Type"
              value={guestType}
              onChange={(e) => setGuestType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            
            {/* Region and Province - Side by side */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            {/* Generate Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Generate
            </button>
          </form>
        </div>

        {/* Guest History Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Guest History</h2>
          <p className="text-gray-500 mb-4">Today</p>
          
          {/* Guest History List */}
          <div className="space-y-0">
            {guestHistory.map((guest, index) => (
              <Link key={guest.id} to={`/dashboard/guest/${guest.id}`} className="block">
                <div className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">{guest.name}</h3>
                    <p className="text-gray-900 text-sm mt-1">{guest.email}</p>
                    <p className="text-gray-900 text-sm mt-1">{guest.location}</p>
                  </div>
                  
                  {/* Navigation Arrow */}
                  <div className="flex-shrink-0 ml-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Divider - Show for all except last item */}
                {index < guestHistory.length - 1 && (
                  <div className="border-t border-gray-200"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
