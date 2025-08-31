import { useState } from "react"

export default function DashboardNavbar({ user, onLogout, onMenuToggle }) {
  return (
    <nav className="bg-white">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <img
              src="/nta-ict-logo.svg"
              alt="NTA ICT Logo"
              className="w-10 h-10"
            />
          </div>
          
          {/* Right side - Menu Button */}
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
