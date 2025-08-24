export default function Footer() {
    const quickLinks = [
        { name: "Quick Links", href: "#", isHeader: true },
        { name: "About", href: "#about" },
        { name: "Sub Units", href: "#subunits" },
        { name: "Resources", href: "#" },
        { name: "Community", href: "#community" },
        { name: "Support", href: "#" }
    ]

    const socialIcons = [
        { name: "Twitter", iconPath: "/src/assets/images/x-icon.svg", href: "#" },
        { name: "Instagram", iconPath: "/src/assets/images/instagram-icon.svg", href: "#" },
        { name: "Telegram", iconPath: "/src/assets/images/telegram-icon.svg", href: "#" }
    ]

    return (
        <footer className="bg-blue-600 text-white py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Logo Section */}
                <div className="flex justify-center sm:justify-start mb-8 sm:mb-10 lg:mb-12">
                    <img 
                        src="/src/assets/images/dtce-logo.svg" 
                        alt="DTCE ICT Logo" 
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                    />
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center mb-10 sm:mb-12 lg:mb-16">
                    <ul className="space-y-4 sm:space-y-6 text-center">
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                {link.isHeader ? (
                                    <h4 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">{link.name}</h4>
                                ) : (
                                    <a 
                                        href={link.href}
                                        className="text-white hover:text-blue-200 transition-colors text-base sm:text-lg"
                                    >
                                        {link.name}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter Section */}
                <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                    <div className="max-w-3xl mx-auto">
                        {/* Mobile Newsletter */}
                        <div className="sm:hidden">
                            <input 
                                type="email" 
                                placeholder="Enter your Email Address"
                                className="w-full px-4 py-3 rounded-lg border-none outline-none text-gray-700 placeholder-gray-400 text-sm mb-3"
                            />
                            <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm">
                                Subscribe
                            </button>
                        </div>
                        
                        <div className="hidden sm:flex rounded-full bg-white p-1.5">
                            <input 
                                type="email" 
                                placeholder="Enter your Email Address"
                                className="flex-1 px-6 lg:px-8 py-3 lg:py-4 rounded-full border-none outline-none text-gray-700 placeholder-gray-400 text-base lg:text-lg"
                            />
                            <button className="bg-blue-600 text-white px-6 lg:px-10 py-3 lg:py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-base lg:text-lg">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-blue-500 pt-6 sm:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
                        {/* Copyright */}
                        <p className="text-blue-200 text-center md:text-left text-sm sm:text-base">
                            © DTCE Techies 2025. All rights reserved
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-4 sm:space-x-6">
                            {socialIcons.map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
                                    aria-label={social.name}
                                >
                                    <img 
                                        src={social.iconPath} 
                                        alt={`${social.name} icon`}
                                        className="w-6 h-6 sm:w-8 sm:h-8" 
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
