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
          name: "John Doe",
          email: formData.email,
          role: "ICT Member",
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-6 md:py-6">
        <div className="flex items-center">
          <img 
            src="/nta-ict-logo.svg" 
            alt="NTA ICT Logo" 
            className="w-10 h-10 md:w-12 md:h-12 mr-3"
          />
        </div>
        
        {/* Hamburger Menu */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Banner/Hero Section */}
      <div className="px-4 md:px-6">
        <div className="bg-blue-600 py-8 md:py-12 relative overflow-hidden w-full h-64 md:h-80 rounded-xl" style={{ backgroundImage: 'url(/login-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="px-4 py-8 md:py-12 md:px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Please sign in here to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Input Email"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Input Password"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Forgot password?{" "}
              <button className="text-blue-600 font-medium hover:underline">
                Reset
              </button>
            </p>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-xs md:text-sm">
              Only authorized team members can log in. Contact admin if you don't have access.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
