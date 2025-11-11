export default function ProfilePanel({ isOpen, onClose, user }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        />
      )}

      {/* Profile Panel - slides from left like sidebar */}
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
            <h2 className="text-2xl font-semibold text-gray-400 dark:text-gray-500" style={{ fontFamily: "inherit" }}>Profile</h2>
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
            <div className="w-28 h-28 rounded-full bg-[#FF6A18] flex items-center justify-center overflow-hidden mb-2">
              <img
                src="/avatar.svg"
                alt="Pixel Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-base font-medium text-black dark:text-white leading-tight" style={{ fontFamily: "inherit" }}>
                {(user?.name || "").toUpperCase() || "USER"}
              </h3>
              <p className="text-xs text-[#A3A3A3] dark:text-gray-400 mt-1" style={{ fontFamily: "inherit" }}>
                {user?.department || user?.role || "Technical"}
              </p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="w-full flex-1 flex flex-col mt-4">
            <div className="w-full mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-black dark:text-white" style={{ fontFamily: "inherit" }}>Personal Information</h4>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" style={{ fontFamily: "inherit" }}>Name</p>
                  <p className="text-sm text-black dark:text-white font-medium" style={{ fontFamily: "inherit" }}>
                    {user?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" style={{ fontFamily: "inherit" }}>Email Address</p>
                  <p className="text-sm text-black dark:text-white font-medium" style={{ fontFamily: "inherit" }}>
                    {user?.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" style={{ fontFamily: "inherit" }}>Province</p>
                  <p className="text-sm text-black dark:text-white font-medium" style={{ fontFamily: "inherit" }}>
                    {user?.province || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" style={{ fontFamily: "inherit" }}>Region</p>
                  <p className="text-sm text-black dark:text-white font-medium" style={{ fontFamily: "inherit" }}>
                    {user?.region || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" style={{ fontFamily: "inherit" }}>Subunit</p>
                  <p className="text-sm text-black dark:text-white font-medium" style={{ fontFamily: "inherit" }}>
                    {(user?.department || user?.role || "Technical").toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Generate ID Card Button */}
          <div className="w-full pb-6 mt-auto">
            <button 
              className="w-full h-10 bg-[#0057FF] text-white rounded-lg text-xs font-normal"
              style={{ fontFamily: "inherit" }}
            >
              Generate My ID Card
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

