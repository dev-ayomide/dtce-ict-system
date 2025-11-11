import { useState, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"
import ProfilePanel from "../components/ProfilePanel"
import Footer from "../components/Footer"

export default function AssignedTask() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [showAssign, setShowAssign] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [form, setForm] = useState({ member: "", title: "", description: "", duration: "" })
  const navigate = useNavigate()
  const { user: authUser, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (!authUser) {
      navigate("/login")
      return
    }
    setUser(authUser)
  }, [authUser, navigate])

  useEffect(() => {
    const presetMember = location.state && location.state.member
    if (presetMember) {
      setForm(prev => ({ ...prev, member: presetMember }))
      setShowAssign(true)
      // clear state so reloads don't reopen repeatedly
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const tasks = [
    {
      id: 1,
      timestamp: "Task assigned 5 hours ago",
      title: "ICT System Dashboard screen Bug",
      assignee: "Task Assigned to GEORGE OGUNS",
      description:
        "I noticed when you click on the check in button on the dashboard screen, its not working. Please fix asap",
      status: "pending",
    },
    {
      id: 2,
      timestamp: "Task assigned 5 hours ago",
      title: "ICT System Dashboard screen Bug",
      assignee: "Task Assigned to GEORGE OGUNS",
      description:
        "I noticed when you click on the check in button on the dashboard screen, its not working. Please fix asap",
      status: "pending",
    },
  ]

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case "pending":
        return tasks.filter((task) => task.status === "pending")
      case "completed":
        return tasks.filter((task) => task.status === "completed")
      default:
        return tasks
    }
  }

  const filteredTasks = getFilteredTasks()

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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Assigned Task</h1>

        <div className="flex justify-center space-x-2 mb-6">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "all"
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "pending"
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Pending (0)
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "completed"
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Completed (0)
          </button>
        </div>

        <div className="mb-4">
          <button onClick={() => setShowAssign(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Assign a new Task</button>
        </div>

        <div className="space-y-0">
          {filteredTasks.map((task, index) => (
            <Link key={task.id} to={`/dashboard/task/${task.id}`} className="block">
              <div className="py-4 hover:bg-gray-50 transition-colors">
                <p className="text-gray-500 text-xs mb-2">{task.timestamp}</p>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{task.title}</h3>
                <p className="text-gray-900 text-sm mb-2">{task.assignee}</p>
                <p className="text-gray-900 text-sm leading-relaxed">
                  {task.description}
                  <span className="text-blue-600 ml-1 cursor-pointer hover:underline">more</span>
                </p>
              </div>
              {index < filteredTasks.length - 1 && <div className="border-t border-gray-200"></div>}
            </Link>
          ))}
        </div>
      </main>

      {/* Assign Task Modal */}
      {showAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAssign(false)} />
          <div className="relative bg-white rounded-2xl w-[92%] max-w-md p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold">Assign a new Task?</h3>
              <button onClick={() => setShowAssign(false)} className="w-8 h-8 rounded-full bg-gray-100">✕</button>
            </div>
            <p className="text-xs text-gray-500 mb-4">Fill in the following details to assign task to a team member</p>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-sm font-medium mb-1">Who do you want to assign this task to ?</label>
                <select value={form.member} onChange={e=>setForm({...form, member:e.target.value})} className="w-full border rounded-lg h-10 px-3 text-sm bg-gray-50">
                  <option value="">Select a team member</option>
                  <option>GEORGE OGUNS</option>
                  <option>AYOMIDE OGUNS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Task title</label>
                <p className="text-xs text-gray-500 mb-1">Create a strong task title</p>
                <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="ICT system dashboard screen debugging" className="w-full border rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <p className="text-xs text-gray-500 mb-1">Provide a brief and concise task description</p>
                <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} rows={5} className="w-full border rounded-lg p-3 text-sm" placeholder="Enter Description for the task" />
              </div>
              <div>
                <label className="block text-sm font-medium">Task duration/ Deadline</label>
                <select value={form.duration} onChange={e=>setForm({...form, duration:e.target.value})} className="w-full border rounded-lg h-10 px-3 text-sm bg-gray-50">
                  <option value="">Select duration</option>
                  <option>3 Hours</option>
                  <option>1 Day</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Files</label>
                <div className="w-full h-28 border-2 border-dashed rounded-xl flex items-center justify-center text-xs text-gray-500">
                  Select or Drop File
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={()=>{ setShowAssign(false); setShowSuccess(true); }} className="flex-1 h-10 bg-blue-600 text-white rounded-lg text-sm">Assign Task</button>
              <button onClick={()=> setShowAssign(false)} className="h-10 px-4 border rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Screen */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white rounded-2xl w-[92%] max-w-sm p-6 text-center">
            <img src="/assigned-task.svg" alt="Task Assigned" className="w-48 mx-auto" />
            <h3 className="text-xl font-bold mt-4">Task Assigned</h3>
            <p className="text-sm text-gray-600 mt-2">You have successfully assigned task to a team member.</p>
            <Link to="/dashboard/assigned-task" onClick={()=>setShowSuccess(false)} className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm">View Task</Link>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}


