import { Link } from "react-scroll"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Navbar() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Toggle dark mode and apply to document
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Initialize dark mode on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const handleLinkClick = (section) => {
    setActiveSection(section)
    setIsMenuOpen(false) // Close mobile menu on link click
  }

  return (
    <>
      {/* Desktop Navbar */}
      <header className="fixed top-3 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="bg-[#F2F2F2E5] dark:bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-full px-4 lg:px-6 py-2 lg:py-3 flex items-center justify-between min-w-fit">
          <div className="flex items-center mr-4 lg:mr-8">
            <img 
              src="/src/assets/images/dtce-logo.svg"
              alt="DTCE ICT Logo" 
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full mr-2 lg:mr-3"
            />
          </div>

          {/* Navigation */}
          <nav className="flex items-center rounded-full p-1 mr-4 lg:mr-8">
            <Link 
              to="hero" 
              smooth={true} 
              offset={-100}
              className={`px-3 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                activeSection === "hero" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => setActiveSection("hero")}
            >
              Home
            </Link>
            <Link 
              to="about" 
              smooth={true} 
              offset={-100}
              className={`px-3 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                activeSection === "about" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => setActiveSection("about")}
            >
              About
            </Link>
            <Link 
              to="subunits" 
              smooth={true} 
              offset={-100}
              className={`px-3 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                activeSection === "subunits" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => setActiveSection("subunits")}
            >
              Sub Units
            </Link>
            <Link 
              to="community" 
              smooth={true} 
              offset={-100}
              className={`px-3 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                activeSection === "community" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => setActiveSection("community")}
            >
              Community
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Dark mode toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Login button */}
            <button 
              onClick={() => navigate("/login")} 
              className="px-4 lg:px-6 py-2 bg-blue-600 text-white rounded-full text-xs lg:text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-gray-900 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/src/assets/images/dtce-logo.svg"
              alt="DTCE ICT Logo" 
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">DTCE ICT</span>
          </div>

          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-6">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="about" 
                smooth={true} 
                offset={-100}
                className="text-gray-900 dark:text-white text-lg font-medium py-2 transition-all cursor-pointer hover:text-blue-600"
                onClick={() => handleLinkClick("about")}
              >
                About
              </Link>
              <Link 
                to="subunits" 
                smooth={true} 
                offset={-100}
                className="text-gray-900 dark:text-white text-lg font-medium py-2 transition-all cursor-pointer hover:text-blue-600"
                onClick={() => handleLinkClick("subunits")}
              >
                Sub Units
              </Link>
              <Link 
                to="community" 
                smooth={true} 
                offset={-100}
                className="text-gray-900 dark:text-white text-lg font-medium py-2 transition-all cursor-pointer hover:text-blue-600"
                onClick={() => handleLinkClick("community")}
              >
                Community
              </Link>
              <a 
                href="#support"
                className="text-gray-900 dark:text-white text-lg font-medium py-2 transition-all cursor-pointer hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </a>
            </nav>
            
            {/* Mobile Action Buttons */}
            <div className="mt-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate("/login")} 
                  className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Log In
                </button>
                
                {/* Dark mode toggle */}
                <button 
                  onClick={toggleDarkMode}
                  className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
                >
                  {isDarkMode ? (
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
