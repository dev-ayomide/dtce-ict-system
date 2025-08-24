export default function About() {
    return (
        <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                            About RCCG DTCE ICT Department
                        </h2>
                        <div className="space-y-3 sm:space-y-4 text-black dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                            <p>
                                RCCG DTCE ICT is the official digital innovation arm of the Junior 
                                Church. We exist to empower children and teens ministries with 
                                cutting-edge technology, ensuring their journey progression expression 
                                in a digital age.
                            </p>
                            <p>
                                DTCE bridges the gap between faith and technology — 
                                equipping ministry teams with the skills and systems needed to 
                                thrive in the evolving world. Whether through media, data, or 
                                digital infrastructure, our focus is clear: to enable scalable, 
                                Christ-led excellence.
                            </p>
                            <p>
                                As more than just an IT department, We are are leading beacon 
                                missionaries — committed to raising a generation that serves 
                                God with relevance, creativity, and bold technological 
                                stewardship.
                            </p>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative max-w-md lg:max-w-none w-full">
                            <img 
                                src="/src/assets/images/about-image.png" 
                                alt="RCCG DTCE ICT Department" 
                                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}