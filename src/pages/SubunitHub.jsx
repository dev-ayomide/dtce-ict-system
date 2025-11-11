import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"
import ProfilePanel from "../components/ProfilePanel"
import Footer from "../components/Footer"

export default function SubunitHub() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [form, setForm] = useState({ firstName: "", lastName: "", gender: "", email: "", phone: "", role: "" })
  const navigate = useNavigate()
  const { user: authUser, logout } = useAuth()

  useEffect(() => {
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

  const members = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: "AKINIPE EMMANUEL GEORGE",
    email: "emmanueloluwasegun15@gmail.com",
    avatar: "/avatar.svg",
    gender: "MALE",
    role: "Product Designer (UI/UX)",
    phone: "09031605189",
  }))

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.email.toLowerCase().includes(query.toLowerCase())
  )

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

      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} user={user} />
      
      <ProfilePanel 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />

      <main className="px-4 md:px-8 lg:px-16 pt-20 pb-4 md:pb-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sub Unit Hub</h1>

        <div className="mb-4">
          <button onClick={()=>setShowAddModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Add user to your sub unit</button>
        </div>

        <div className="mb-5">
          <div className="w-full bg-gray-100 rounded-full px-4 py-2 flex items-center">
            <svg className="w-5 h-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              placeholder="search for a team member"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filtered.map((m) => (
            <button key={m.id} type="button" className="w-full flex items-center gap-3 py-3 text-left" onClick={()=>{ setSelectedMember(m); setShowMemberModal(true); }}>
              <img src={m.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{m.name}</div>
                <div className="text-xs text-gray-500">{m.email}</div>
              </div>
              <span className="text-xs px-3 py-1 rounded-lg border border-gray-300">Details</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <button className="w-8 h-8 rounded-full border">{"<"}</button>
          {[1, 2, 3].map((n) => (
            <button key={n} className={`w-8 h-8 rounded-full border ${n === 1 ? "bg-gray-100" : ""}`}>{n}</button>
          ))}
          <button className="w-8 h-8 rounded-full border">{">"}</button>
        </div>
      </main>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-4xl p-6 md:p-8 shadow-xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Add a user to your Sub unit</h3>
                <p className="text-xs text-gray-500">Fill in the following details to add to new team member</p>
              </div>
              <button onClick={()=>setShowAddModal(false)} className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors">✕</button>
            </div>

            <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} placeholder="Enter user first name" className="w-full rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} placeholder="Enter user last name" className="w-full rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <div className="relative">
                  <select value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})} className="w-full rounded-lg h-10 px-3 text-sm bg-gray-50 appearance-none pr-10">
                    <option value="">Select gender</option>
                    <option>MALE</option>
                    <option>FEMALE</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Enter user email address" className="w-full rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Enter user phone number" className="w-full rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input value={form.role} onChange={e=>setForm({...form, role:e.target.value})} placeholder="Enter user role" className="w-full rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={()=>setShowAddModal(false)} className="h-10 px-4 border rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={()=>setShowAddModal(false)} className="h-10 px-6 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Add User</button>
            </div>
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setShowMemberModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-4xl p-6 md:p-8 shadow-xl">
            <button onClick={()=>setShowMemberModal(false)} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors">✕</button>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="flex-shrink-0 text-center md:text-left">
                <img src={selectedMember.avatar} alt="avatar" className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto md:mx-0" />
                <h3 className="text-lg md:text-xl font-bold mt-3">{selectedMember.name}</h3>
                <p className="text-sm text-gray-500">{selectedMember.gender}</p>
              </div>

              <div className="flex-1 w-full">
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-sm text-gray-700">Role: </span>
                    <span className="text-gray-900">{selectedMember.role}</span>
                  </div>
                  <div className="break-words">
                    <span className="font-medium text-sm text-gray-700">Email: </span>
                    <span className="text-gray-900">{selectedMember.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm text-gray-700">Phone Number: </span>
                    <span className="text-gray-900">{selectedMember.phone}</span>
                  </div>
                </div>

                <button onClick={()=>{ setShowMemberModal(false); navigate('/dashboard/assigned-task', { state: { member: selectedMember.name } }); }} className="mt-6 w-full md:w-auto md:px-8 h-10 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Assign Task</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}


