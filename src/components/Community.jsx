export default function Community() {
  const communityFeatures = [
    {
      title: "Join Our Team",
      description: "Be part of our innovative digital ministry team and contribute to transforming lives through technology.",
      buttonText: "Apply Now",
      bgColor: "bg-blue-600"
    },
    {
      title: "Get Involved",
      description: "Participate in our programs, workshops, and community initiatives designed to empower digital ministry.",
      buttonText: "Learn More",
      bgColor: "bg-purple-600"
    },
    {
      title: "Support Our Mission",
      description: "Help us expand our digital transformation efforts across Junior Church ministries worldwide.",
      buttonText: "Donate",
      bgColor: "bg-green-600"
    }
  ]

  return (
    <section id="community" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Join Our Community</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Be part of a growing community of digital ministry leaders, innovators, and passionate individuals 
            committed to advancing the Kingdom through technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-16">
          {communityFeatures.map((feature, index) => (
            <div key={index} className={`${feature.bgColor} text-white p-6 sm:p-8 rounded-xl lg:rounded-2xl text-center`}>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
              <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base leading-relaxed">{feature.description}</p>
              <button className="bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base">
                {feature.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}