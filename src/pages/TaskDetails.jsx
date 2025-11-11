import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"
import ProfilePanel from "../components/ProfilePanel"
import Footer from "../components/Footer"

export default function TaskDetails() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [taskStatus, setTaskStatus] = useState("not-started")
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 45, seconds: 0 })
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const navigate = useNavigate()
  const { user: authUser, logout } = useAuth()
  const { taskId } = useParams()

  useEffect(() => {
    // Check if user is authenticated
    if (!authUser) {
      navigate("/login")
      return
    }

    setUser(authUser)
  }, [authUser, navigate])

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 }
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 }
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 }
        } else {
          return { hours: 0, minutes: 0, seconds: 0 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleStatusUpdate = (status) => {
    if (status === "completed") {
      setShowUpdateModal(true)
    } else {
      setTaskStatus(status)
      // Handle status update logic here
      console.log("Task status updated to:", status)
    }
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024) // 5MB limit
    setUploadedFiles(prev => [...prev, ...validFiles])
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024) // 5MB limit
    setUploadedFiles(prev => [...prev, ...validFiles])
  }

  const handleFileRemove = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // Handle submit logic here
    console.log("Submitting task completion with files:", uploadedFiles)
    setTaskStatus("completed")
    setShowUpdateModal(false)
    setUploadedFiles([])
  }

  if (!user) {
    return <div>Loading...</div>
  }

  // Mock task data - in real app, fetch based on taskId
  const task = {
    id: taskId || "1",
    name: "ICT System Dashboard screen Bug",
    date: "August 7th, 2025",
    description: "I noticed when you click on the check in button on the dashboard screen, its not working. Please fix asap",
    deadline: "3 Hours : 45 Minutes",
    attachments: [
      "ICT System Dashboard brief.pdf",
      "ICT System Dashboard Additional File.pdf"
    ]
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
      
      <main className="px-4 md:px-8 lg:px-16 pt-20 pb-4 md:pb-8 max-w-7xl mx-auto space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900">Task details</h1>

        {/* Task Information Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600">{task.name}</h2>
          <p className="text-gray-600">{task.date}</p>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {task.description}
              <span className="text-blue-600 ml-1 cursor-pointer hover:underline">more</span>
            </p>
          </div>

          {/* Attached Files */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Attached Files</h3>
            <div className="space-y-2">
              {task.attachments.map((file, index) => (
                <div key={index} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="text-sm">{file}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Deadline Section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Task Deadline</h3>
          <p className="text-gray-700">{task.deadline}</p>
        </div>

        {/* Update Task Status Section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Update Task Status</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => handleStatusUpdate("not-started")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                taskStatus === "not-started"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Not started
            </button>
            <button
              onClick={() => handleStatusUpdate("ongoing")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                taskStatus === "ongoing"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => handleStatusUpdate("completed")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                taskStatus === "completed"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Countdown Section */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">Countdown to task deadline</h3>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs text-gray-500 uppercase">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700">:</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs text-gray-500 uppercase">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700">:</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs text-gray-500 uppercase">Seconds</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Update Task Status Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowUpdateModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-4xl p-6 md:p-8 shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setShowUpdateModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2">Update Task Status?</h3>
                <p className="text-sm text-gray-600">
                  To update task status to "COMPLETED" you will need to upload a proof that you've got the task done.
                </p>
              </div>

              {/* File Upload Area */}
              <div
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                className="rounded-xl p-8 md:p-12 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Select or Drop File</p>
                      <p className="text-xs text-gray-500 mt-1">Max size of 5MB</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-blue-600 truncate">{file.name}</span>
                      </div>
                      <button
                        onClick={() => handleFileRemove(index)}
                        className="ml-2 text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
