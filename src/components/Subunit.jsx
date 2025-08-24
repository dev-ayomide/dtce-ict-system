export default function Subunit() {
  const subunits = [
    {
      title: "Technical unit",
      description: "Brings creative ideas through software development and system management",
      iconPath: "/technical-icon.svg"
    },
    {
      title: "CBS",
      description: "Captures and creates compelling visual content for ministry events and communications",
      iconPath: "/cbs-icon.svg"
    },
    {
      title: "Cybersecurity",
      description: "Protects our digital assets and ensures a safe online environment for all",
      iconPath: "/cybersecurity-icon.svg"
    },
    {
      title: "Data Analysis",
      description: "Leverages data to drive smarter, data-led decisions and ministry growth",
      iconPath: "/data-analysis-icon.svg"
    },
    {
      title: "Research and Innovation",
      description: "Explores emerging technologies to extend and enhance our digital outreach",
      iconPath: "/research-icon.svg"
    }
  ]

  return (
    <section id="subunits" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Our Sub-Unit</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The RCCG DTCE ICT Department is structured into focused sub-units — each uniquely equipped to support 
            digital transformation, innovation, and excellence within the Junior Church globally.
          </p>
        </div>

        {/* Sub-units Grid - Responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
          {subunits.slice(0, 3).map((unit, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4 sm:mb-6">
                <img 
                  src={unit.iconPath} 
                  alt={`${unit.title} icon`}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">{unit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed text-center">{unit.description}</p>
            </div>
          ))}
        </div>

        {/* Sub-units Grid - Second row: 2 cards centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-2xl w-full">
            {subunits.slice(3, 5).map((unit, index) => (
              <div key={index + 3} className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <img 
                    src={unit.iconPath} 
                    alt={`${unit.title} icon`}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{unit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">{unit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-10 lg:mb-12 mt-12 sm:mt-16 lg:mt-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">ICT Showcase</h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
            A visual journey through the various sub-units in the RCCG DTCE ICT Department. Each sub-unit contributes 
            uniquely to the digital transformation and innovation across the Junior Church.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
          {[
            '/showcase1.jpg',
            '/showcase2.jpg',
            '/showcase3.jpg',
            '/showcase4.jpg',
            '/showcase5.jpg',
            '/showcase6.jpg',
          ].map((imagePath, index) => (
            <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:scale-105 transition-transform">
              <img 
                src={imagePath}
                alt={`ICT Showcase ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Leaders Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Meet Our Leaders</h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
            A team of passionate leaders, each contributing uniquely to the digital transformation of our ministry
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden">
                  <img 
                    src="/placeholder.png" 
                    alt={`Leader ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">John Kusimo</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Head of Technical Unit</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}