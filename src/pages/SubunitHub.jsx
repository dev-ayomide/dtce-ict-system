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
    return <div>Loading...</div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl w-[92%] max-w-md p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold">Add a user to your Sub unit</h3>
              <button onClick={()=>setShowAddModal(false)} className="w-8 h-8 rounded-full bg-gray-100">✕</button>
            </div>
            <p className="text-xs text-gray-500 mb-4">Fill in the following details to add to new team member</p>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} placeholder="Enter user first name" className="w-full border rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} placeholder="Enter user last name" className="w-full border rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})} className="w-full border rounded-lg h-10 px-3 text-sm bg-gray-50">
                  <option value="">Select gender</option>
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Enter user email address" className="w-full border rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Enter user phone number" className="w-full border rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input value={form.role} onChange={e=>setForm({...form, role:e.target.value})} placeholder="Enter user role" className="w-full border rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={()=>setShowAddModal(false)} className="flex-1 h-10 bg-blue-600 text-white rounded-lg text-sm">Add User</button>
              <button onClick={()=>setShowAddModal(false)} className="h-10 px-4 border rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setShowMemberModal(false)} />
          <div className="relative bg-white rounded-2xl w-[92%] max-w-sm p-6 text-center">
            <button onClick={()=>setShowMemberModal(false)} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100">✕</button>
            <img src={selectedMember.avatar} alt="avatar" className="w-20 h-20 rounded-full mx-auto" />
            <h3 className="text-base font-bold mt-3">{selectedMember.name}</h3>
            <p className="text-xs text-gray-500">{selectedMember.gender}</p>

            <div className="text-left mt-5 space-y-3">
              <div><span className="font-medium">Role: </span><span className="text-gray-700">{selectedMember.role}</span></div>
              <div className="break-words"><span className="font-medium">Email: </span><span className="text-gray-700">{selectedMember.email}</span></div>
              <div><span className="font-medium">Phone Number: </span><span className="text-gray-700">{selectedMember.phone}</span></div>
            </div>

            <button onClick={()=>{ setShowMemberModal(false); navigate('/dashboard/assigned-task', { state: { member: selectedMember.name } }); }} className="mt-6 w-full h-10 bg-blue-600 text-white rounded-lg text-sm">Assign Task</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}


