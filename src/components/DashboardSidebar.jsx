import { Link, useLocation } from "react-router-dom"

export default function DashboardSidebar({ isOpen, onClose, user }) {
  const location = useLocation();

  const isSubunitHead = (user?.role || "").toLowerCase().includes("head")

  const navigation = isSubunitHead
    ? [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Notifications", href: "/dashboard/notifications" },
        { name: "Attendance", href: "/dashboard/attendance" },
        { name: "Assigned Task", href: "/dashboard/assigned-task" },
        { name: "Subunit Hub", href: "/dashboard/subunit-hub" },
        { name: "Profile", href: "/dashboard/profile" },
      ]
    : [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Notifications", href: "/dashboard/notifications" },
        { name: "Attendance", href: "/dashboard/attendance" },
        { name: "My Task", href: "/dashboard/my-task" },
        { name: "My Guest", href: "/dashboard/my-guest" },
        { name: "Profile", href: "/dashboard/profile" },
      ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col items-center
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col h-full">
          {/* Header */}
          <div className="w-full flex items-center justify-between pt-4 pb-0">
            <img
              src="/nta-ict-logo.svg"
              alt="NTA ICT Logo"
              className="w-10 h-10"
            />
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mt-6 mb-2">
            {/* Profile image placeholder */}
            <div className="w-28 h-28 rounded-full bg-[#FF6A18] flex items-center justify-center overflow-hidden mb-2">
              {/* Replace with actual profile image */}
              <img
                src="/profile-placeholder.png"
                alt="Profile"
                className="w-full h-full object-cover"
                style={{ display: "none" }} // Hide by default, just a placeholder
              />
              {/* Pixel avatar placeholder */}
              <img
                src="/avatar.svg"
                alt="Pixel Avatar"
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </div>
            <div className="text-center">
              <h3 className="text-base font-medium text-black dark:text-white leading-tight" style={{ fontFamily: "inherit" }}>
                {(user?.name || "").toUpperCase() || "USER"}
              </h3>
              <p className="text-xs text-[#A3A3A3] dark:text-gray-400 mt-1" style={{ fontFamily: "inherit" }}>
                {user?.department || "ICT"}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="w-full flex-1 flex flex-col items-center mt-4">
            <div className="w-full flex flex-col gap-2">
              {navigation.map((item, idx) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className="w-full"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="w-full px-4 py-2 text-black dark:text-white"
                    style={{
                      fontFamily: "inherit",
                      fontWeight: idx === 0 ? "400" : "400",
                      fontSize: "15px",
                      marginBottom: idx === navigation.length - 1 ? 0 : "0.5rem",
                    }}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="w-full pb-6 mt-auto flex items-center justify-between gap-3">
          <button
            className="flex-1 h-10 bg-[#0057FF] text-white rounded-lg text-xs font-normal"
            style={{ fontFamily: "inherit" }}
          >
            Report Issues
          </button>
          <button
            className="w-10 h-10 bg-white dark:bg-gray-800 border border-black dark:border-gray-600 rounded-lg flex items-center justify-center ml-2"
            style={{ minWidth: "2.5rem" }}
          >
            <img src="/sun.svg" alt="Sun" className="w-5 h-5" />
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
