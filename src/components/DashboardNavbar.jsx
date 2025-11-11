import { useState, useEffect } from "react"

export default function DashboardNavbar({ user, onLogout, onMenuToggle, onProfileToggle }) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-50 transition-transform duration-300 overflow-hidden ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="px-4 md:px-8 lg:px-16 py-3 pb-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <img
              src="/nta-ict-logo.svg"
              alt="NTA ICT Logo"
              className="w-10 h-10"
            />
          </div>
          
          {/* Right side - Profile and Menu Buttons */}
          <div className="flex items-center gap-2">
            {/* Profile Icon Button */}
            <button
              onClick={onProfileToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open Profile"
            >
              <div className="w-8 h-8 rounded-full bg-[#FF6A18] flex items-center justify-center overflow-hidden">
                <img
                  src="/avatar.svg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
            
            {/* Menu Button */}
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open Menu"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
