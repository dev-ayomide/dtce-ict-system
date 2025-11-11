import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"
import ProfilePanel from "../components/ProfilePanel"
import Footer from "../components/Footer"

export default function MyGuest() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()
  const { user: authUser, logout } = useAuth()

  // Form state
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guestType, setGuestType] = useState("")
  const [region, setRegion] = useState("")
  const [province, setProvince] = useState("")
  
  // Modal state
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [showGuestModal, setShowGuestModal] = useState(false)

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
      location: "Region 44 | Ogun province 21",
      region: "44",
      province: "Ogun province 21",
      guestType: "Teenager"
    },
    {
      id: 2,
      name: "James Ogunmepon",
      email: "jamesogunmepon556@gmail.com",
      location: "Region 44 | Ogun province 21",
      region: "44",
      province: "Ogun province 21",
      guestType: "Teenager"
    },
    {
      id: 3,
      name: "James Ogunmepon",
      email: "jamesogunmepon556@gmail.com",
      location: "Region 44 | Ogun province 21",
      region: "44",
      province: "Ogun province 21",
      guestType: "Teenager"
    }
  ]

  const handleGuestClick = (guest) => {
    setSelectedGuest(guest)
    setShowGuestModal(true)
  }

  const handlePrintPasscard = () => {
    // Navigate to the passcard print screen
    if (selectedGuest) {
      navigate(`/dashboard/guest/${selectedGuest.id}/passcard`)
    }
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
        {/* Header Section */}
        <div className="mb-2">
          <h1 className="text-2xl font-semibold text-black mb-2">My Guest</h1>
          <p className="text-base font-normal text-black">Generate your guest passcard</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleGenerate} className="border border-[#a6a6a6] rounded-3xl p-6 md:p-8 mb-8 relative pb-6 md:pb-20">
          <div className="flex flex-col gap-6">
            {/* Guest Name */}
            <div className="flex flex-col md:flex-row md:gap-12 items-start">
              <div className="w-full md:w-48 flex flex-col items-start md:items-center mb-2 md:mb-0">
                <label className="font-bold text-base text-[#020202]">Guest Name</label>
              </div>
              <div className="flex-1 flex flex-col gap-2 w-full">
                <input
                  type="text"
                  placeholder="Input your guest Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="bg-[rgba(0,0,0,0.02)] border border-[#e0e0e0] h-12 rounded-xl px-4 text-sm text-[#878787] placeholder:text-[#878787] focus:outline-none w-full"
                  required
                />
                <div className="text-xs text-[#878787]">
                  <p className="font-bold mb-0">Examples</p>
                  <p className="mb-0">- Ogunmepon Samuel</p>
                </div>
              </div>
            </div>

            {/* Guest Email */}
            <div className="flex flex-col md:flex-row md:gap-12 items-center">
              <div className="w-full md:w-48 flex flex-col items-start md:items-center mb-2 md:mb-0">
                <label className="font-bold text-base text-[#020202]">Guest Email</label>
              </div>
              <div className="flex-1 w-full">
                <input
                  type="email"
                  placeholder="Input your guest email address"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="bg-[rgba(0,0,0,0.02)] border border-[#e0e0e0] h-12 w-full rounded-xl px-4 text-sm text-[#878787] placeholder:text-[#878787] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Guest Type */}
            <div className="flex flex-col md:flex-row md:gap-12 items-center">
              <div className="w-full md:w-48 flex flex-col items-start md:items-center mb-2 md:mb-0">
                <label className="font-bold text-base text-[#020202]">Guest type</label>
              </div>
              <div className="flex-1 w-full">
                <input
                  type="text"
                  placeholder="what type of guest is it ?"
                  value={guestType}
                  onChange={(e) => setGuestType(e.target.value)}
                  className="bg-[rgba(0,0,0,0.02)] border border-[#e0e0e0] h-12 w-full rounded-xl px-4 text-sm text-[#878787] placeholder:text-[#878787] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Region and Province - No label, aligned with inputs */}
            <div className="flex flex-col md:flex-row md:gap-12">
              <div className="w-full md:w-48"></div>
              <div className="flex-1 flex flex-col gap-4 w-full">
                <div className="relative">
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="bg-[rgba(0,0,0,0.02)] border border-[#e0e0e0] h-12 w-full rounded-xl px-4 pr-10 text-sm text-[#878787] focus:outline-none appearance-none"
                    required
                  >
                    <option value="" disabled>Select Region</option>
                    <option value="region1">Region 1</option>
                    <option value="region2">Region 2</option>
                    <option value="region44">Region 44</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="text-[#878787] text-sm rotate-90 inline-block">›</span>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="bg-[rgba(0,0,0,0.02)] border border-[#e0e0e0] h-12 w-full rounded-xl px-4 text-sm text-[#878787] placeholder:text-[#878787] focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Generate Button - Bottom Right */}
          <button
            type="submit"
            className="mt-6 md:absolute bg-[#0153fd] h-12 px-6 rounded-xl md:bottom-6 md:right-6 flex items-center justify-center text-white font-semibold text-sm w-full md:w-auto"
          >
            Generate
          </button>
        </form>

        {/* Guest History Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-black mb-6">Guest History</h2>
          
          {/* Guest History List */}
          <div className="flex flex-col gap-6">
            {guestHistory.map((guest, index) => (
              <button
                key={guest.id}
                onClick={() => handleGuestClick(guest)}
                className="block text-left w-full"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2 text-black">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-lg">{guest.name}</h3>
                        <p className="font-normal text-sm">{guest.email}</p>
                      </div>
                      <p className="font-normal text-xs">{guest.location}</p>
                    </div>
                    
                    {/* Navigation Arrow */}
                    <div className="w-6 h-6 flex-shrink-0">
                      <svg className="w-full h-full text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  {index < guestHistory.length - 1 && (
                    <div className="border-t border-gray-300"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Guest Details Modal */}
      {showGuestModal && selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setShowGuestModal(false)}
          />
          
          {/* Modal Card */}
          <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowGuestModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    {/* Placeholder Avatar - Replace with actual image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
                      {selectedGuest.name.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Guest Information */}
                <div className="flex-1 w-full">
                  {/* Name and Email */}
                  <div className="text-center md:text-left mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{selectedGuest.name}</h2>
                    <p className="text-gray-600 text-sm md:text-base">{selectedGuest.email}</p>
                  </div>

                  {/* Guest Details */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-gray-700 text-sm md:text-base">Region: </span>
                      <span className="text-gray-900 font-medium">{selectedGuest.region}</span>
                    </div>
                    <div>
                      <span className="text-gray-700 text-sm md:text-base">Province: </span>
                      <span className="text-gray-900 font-medium">{selectedGuest.province}</span>
                    </div>
                    <div>
                      <span className="text-gray-700 text-sm md:text-base">Guest Type: </span>
                      <span className="text-gray-900 font-medium">{selectedGuest.guestType}</span>
                    </div>
                  </div>

                  {/* Access Note */}
                  <div className="mb-6">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      <span className="font-bold">NOTE:</span> Your guest access is limited to 1 hour in the ICT department workspace.
                    </p>
                  </div>

                  {/* Print Passcard Button */}
                  <button
                    onClick={handlePrintPasscard}
                    className="w-full md:w-auto md:px-8 bg-[#0153fd] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#0144d4] focus:outline-none focus:ring-2 focus:ring-[#0153fd] focus:ring-offset-2 transition-colors"
                  >
                    Print Passcard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
