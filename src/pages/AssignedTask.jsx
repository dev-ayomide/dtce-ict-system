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
    return <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-white">Loading...</div>
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Assigned Task</h1>

        <div className="flex justify-center space-x-2 mb-6">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "all"
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "pending"
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Pending (0)
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "completed"
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
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
              <div className="py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">{task.timestamp}</p>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{task.title}</h3>
                <p className="text-gray-900 dark:text-gray-200 text-sm mb-2">{task.assignee}</p>
                <p className="text-gray-900 dark:text-gray-200 text-sm leading-relaxed">
                  {task.description}
                  <span className="text-blue-600 dark:text-blue-400 ml-1 cursor-pointer hover:underline">more</span>
                </p>
              </div>
              {index < filteredTasks.length - 1 && <div className="border-t border-gray-200 dark:border-gray-700"></div>}
            </Link>
          ))}
        </div>
      </main>

      {/* Assign Task Modal */}
      {showAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAssign(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl p-6 md:p-8 shadow-xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1 text-gray-900 dark:text-white">Assign a new task</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fill in the following to assign task to a team member</p>
              </div>
              <button onClick={() => setShowAssign(false)} className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors">✕</button>
            </div>

            <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2">Who do you want to assign this task to?</label>
                <div className="relative">
                  <select value={form.member} onChange={e=>setForm({...form, member:e.target.value})} className="w-full rounded-lg h-10 px-3 text-sm bg-gray-50 appearance-none pr-10">
                    <option value="">Select team member</option>
                    <option>GEORGE OGUNS</option>
                    <option>AYOMIDE OGUNS</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Task title</label>
                <p className="text-xs text-gray-500 mb-2">Create a strong task title</p>
                <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="UI team dashboard screen debugging" className="w-full rounded-lg h-10 px-3 text-sm bg-gray-50" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <p className="text-xs text-gray-500 mb-2">Provide a brief and concise task description</p>
                <div className="rounded-lg overflow-hidden bg-gray-50">
                  <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} rows={6} className="w-full p-3 text-sm resize-none focus:outline-none bg-transparent" placeholder="Enter Description here..." />
                  <div className="border-t border-gray-200 px-3 py-2 flex items-center gap-3 bg-gray-50">
                    <button type="button" className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded text-gray-600 font-bold text-sm">B</button>
                    <button type="button" className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded text-gray-600 italic text-sm">I</button>
                    <button type="button" className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded text-gray-600 underline text-sm">U</button>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <button type="button" className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13m-13 6h13M3 6h.01M3 12h.01M3 18h.01" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Task duration/Deadline</label>
                <div className="relative">
                  <select value={form.duration} onChange={e=>setForm({...form, duration:e.target.value})} className="w-full rounded-lg h-10 px-3 text-sm bg-gray-50 appearance-none pr-10">
                    <option value="">Select duration</option>
                    <option>3 Hours</option>
                    <option>1 Day</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Files</label>
                <p className="text-xs text-gray-500 mb-2">Choose required fields</p>
                <div className="w-full h-32 rounded-xl flex flex-col items-center justify-center text-xs text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="font-medium">Select or Drop file</p>
                  <p className="text-gray-400 mt-1">Max 100mb</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={()=>{ setShowAssign(false); setShowSuccess(true); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Assign Task</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Screen */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl p-6 md:p-8 text-center shadow-xl">
            <img src="/assigned-task.svg" alt="Task Assigned" className="w-48 md:w-64 mx-auto" />
            <h3 className="text-xl md:text-2xl font-bold mt-4 md:mt-6 text-gray-900 dark:text-white">Task Assigned</h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 md:mt-3">You have successfully assigned task to a team member.</p>
            <Link to="/dashboard/assigned-task" onClick={()=>setShowSuccess(false)} className="inline-block mt-6 md:mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">View Task</Link>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}


