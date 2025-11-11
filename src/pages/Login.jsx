import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Footer from "../components/Footer"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call with mock data
    setTimeout(() => {
      // Mock authentication - in real app, this would validate against backend
      if (formData.email && formData.password) {
        // Create mock user data
        const userData = {
          id: 1,
          name: "Ayomide Taiwo",
          email: formData.email,
          role: (formData.email || "").toLowerCase().includes("head") ? "Subunit Head" : "ICT Member",
          department: "Technical Unit",
          avatar: "/placeholder.png"
        }
        
        // Use auth context to login
        login(userData)
        navigate("/dashboard")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      {/* Main Content - Image and Form Side by Side on Desktop */}
      <div className="px-4 md:px-8 lg:px-16 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Banner/Hero Section - Image */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div className="bg-blue-600 py-8 md:py-12 relative overflow-hidden w-full h-64 md:h-[500px] lg:h-[600px] rounded-xl" style={{ backgroundImage: 'url(/login-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div className="max-w-md mx-auto md:mx-0">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome back👋
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  Please sign in here to your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Input Email"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Input Password"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Log In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
