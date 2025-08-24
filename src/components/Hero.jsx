export default function Hero() {
return (
    <section id="hero" className="pt-16 md:pt-24 min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-16">
            {/* Centered Text Content */}
            <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight sm:leading-relaxed font-medium">
                    Empowering Digital Ministry with
                    <span className="block font-bold text-gray-900 dark:text-white">Purpose & Precision</span>
                </h1>
                <p className="text-sm sm:text-md lg:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 mx-auto leading-relaxed max-w-2xl">
                    The RCCG DTCE ICT platform is engineered to drive transformation across departments
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors">
                    Join Our team
                </button>
            </div>

            {/* Hero Images - Overlapping Circles - Mobile Responsive */}
            <div className="flex justify-center items-center mb-12 sm:mb-20 overflow-x-auto">
                <div className="flex items-center justify-center relative min-w-max">
                    <img 
                        src="/heroimage-1.png" 
                        alt="Digital Ministry" 
                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-lg relative z-10"
                    />
                    <img 
                        src="/heroimage-2.png" 
                        alt="Technology Solutions" 
                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-lg relative -ml-8 sm:-ml-10 lg:-ml-12 z-20"
                    />
                    <img 
                        src="/heroimage-3.png" 
                        alt="Community Building" 
                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-lg relative -ml-8 sm:-ml-10 lg:-ml-12 z-30"
                    />
                    <img 
                        src="/heroimage-4.png" 
                        alt="Innovation" 
                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-lg relative -ml-8 sm:-ml-10 lg:-ml-12 z-40"
                    />
                </div>
            </div>

            {/* Vision Section */}
            <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 text-black dark:text-white">
                <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
                    <div className="w-full lg:w-1/3">
                        <img 
                            src="/welcome.png" 
                            alt="VR Vision" 
                            className="w-full h-48 sm:h-64 lg:h-auto object-cover rounded-xl sm:rounded-2xl"
                        />
                    </div>
                    <div className="w-full lg:w-2/3 text-center lg:text-left">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 leading-tight sm:leading-relaxed">
                            Welcome to a Vision Beyond <br className="hidden sm:block" /> Borders
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-3 sm:mb-4 leading-relaxed">
                            I welcome you warmly to the RCCG DTCE ICT Platform a 
                            transformative digital foundation forged through prayer, purpose, 
                            and innovation. This platform is more than just technology; it is a 
                            bridge between excellence.
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed">
                            Pastor John Kusimo
                            <br />
                            National Coordinator, DTCE ICT
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}
