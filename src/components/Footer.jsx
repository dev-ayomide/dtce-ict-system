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
        { name: "Twitter", iconPath: "/x-icon.svg", href: "#" },
        { name: "Instagram", iconPath: "/instagram-icon.svg", href: "#" },
        { name: "Telegram", iconPath: "/telegram-icon.svg", href: "#" }
    ]

    return (
        <footer className="bg-blue-600 text-white py-6 sm:py-8 lg:py-10 relative overflow-hidden">
            {/* Background Layer */}
            <div 
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'url(/footer-layer.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            
            <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto relative z-10">
                {/* Logo and Quick Links on same line */}
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-6 sm:mb-8 lg:mb-10 relative">
                    {/* Logo Section */}
                    <div className="flex items-center gap-4 sm:absolute sm:left-0">
                        <img 
                            src="/dtce-logo.svg" 
                            alt="DTCE ICT Logo" 
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                        />
                    </div>

                    {/* Quick Links - Centered */}
                    <div className="flex flex-col items-center flex-1">
                        <ul className="space-y-2 sm:space-y-3 text-center">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    {link.isHeader ? (
                                        <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{link.name}</h4>
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
                </div>

                {/* Bottom Section */}
                <div className="border-t border-blue-500 border-dotted pt-4 sm:pt-5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                        {/* Copyright */}
                        <p className="text-blue-200 text-center text-sm sm:text-base">
                            © DTCE Techies 2025. All rights reserved
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-3 sm:space-x-4">
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
