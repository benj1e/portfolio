import {
    Github,
    Linkedin,
    Mail,
    Code,
    User,
    Briefcase,
    MessageCircle,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("about");

    // --- Typing Animation State ---
    const [typedText, setTypedText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    
    // Responsive text based on screen size
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const fullText = "benjamin_alimele()";
    const shortText = "benji()";
    const [targetText, setTargetText] = useState(fullText);
    const [animationPhase, setAnimationPhase] = useState("TYPING");

    // --- Animation Configuration ---
    const TYPING_SPEED_MS = 120;
    const PAUSE_DURATION_MS = 3000;
    const DELETING_SPEED_MS = 80;

    // --- Check screen size ---
    useEffect(() => {
        const checkScreenSize = () => {
            const isSmall = window.innerWidth < 768; // md breakpoint
            setIsSmallScreen(isSmall);
            setTargetText(isSmall ? shortText : fullText);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // --- Repeating Typing Animation Effect ---
    useEffect(() => {
        switch (animationPhase) {
            case "TYPING": {
                if (typedText.length < targetText.length) {
                    const timer = setTimeout(() => {
                        setTypedText(targetText.slice(0, typedText.length + 1));
                    }, TYPING_SPEED_MS);
                    return () => clearTimeout(timer);
                } else {
                    setAnimationPhase("PAUSING");
                }
                break;
            }
            case "PAUSING": {
                const timer = setTimeout(() => {
                    setAnimationPhase("DELETING");
                }, PAUSE_DURATION_MS);
                return () => clearTimeout(timer);
            }
            case "DELETING": {
                if (typedText.length > 0) {
                    const timer = setTimeout(() => {
                        setTypedText(typedText.slice(0, typedText.length - 1));
                    }, DELETING_SPEED_MS);
                    return () => clearTimeout(timer);
                } else {
                    setAnimationPhase("TYPING");
                }
                break;
            }
            default:
                break;
        }
    }, [typedText, animationPhase, targetText]);

    // Reset animation when target text changes
    useEffect(() => {
        setTypedText("");
        setAnimationPhase("TYPING");
    }, [targetText]);

    // --- Effect for the blinking cursor ---
    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setCursorVisible((v) => !v);
        }, 500);
        return () => clearInterval(cursorTimer);
    }, []);

    // --- Scroll and Section Highlighting Effect ---
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setScrolled(scrollTop > 50);

            const sections = ["about", "experience", "projects", "contact"];
            let currentSectionId = "about";
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        currentSectionId = sectionId;
                        break;
                    }
                }
            }
            setActiveSection(currentSectionId);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const navItems = [
        { id: "about", label: "About", icon: User },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "projects", label: "Projects", icon: Code },
        { id: "contact", label: "Contact", icon: MessageCircle },
    ];

    const socialLinks = [
        {
            name: "GitHub",
            icon: Github,
            url: "https://github.com/benj1e",
            color: "hover:text-gray-300",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: "https://linkedin.com/in/omoroje",
            color: "hover:text-blue-400",
        },
        {
            name: "Email",
            icon: Mail,
            url: "mailto:benjaminali968@gmail.com",
            color: "hover:text-green-400",
        },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out font-main ${
                    scrolled
                        ? "bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/30 py-3 shadow-2xl shadow-gray-900/30 transform translate-y-0"
                        : "bg-transparent backdrop-blur-sm py-6 transform translate-y-0"
                }`}
                style={{
                    backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(4px)'
                }}
            >
                <div className="max-w-6xl mx-auto px-3 sm:px-6">
                    <div className="flex items-center justify-between">
                        {/* Animated Logo/Name */}
                        <div
                            className={`transition-all duration-700 ease-out ${
                                scrolled 
                                    ? "scale-90 transform translate-x-1" 
                                    : "scale-100 transform translate-x-0"
                            }`}
                        >
                            <h1 className={`font-bold text-white font-mono2 h-8 transition-all duration-500 ${
                                scrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
                            }`}>
                                <span className="text-green-400 drop-shadow-lg">
                                    {typedText}
                                </span>
                                <span
                                    className={`inline-block w-0.5 bg-green-400 ml-1 -mb-1 transition-all duration-300 shadow-lg shadow-green-400/50 ${
                                        cursorVisible
                                            ? "opacity-100 h-6"
                                            : "opacity-0 h-4"
                                    } ${scrolled ? "h-5" : "h-6"}`}
                                ></span>
                            </h1>
                        </div>

                        {/* Navigation */}
                        <nav className={`hidden md:flex items-center space-x-1 font-links-light transition-all duration-700 ${
                            scrolled ? "transform scale-95" : "transform scale-100"
                        }`}>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 group overflow-hidden ${
                                            isActive
                                                ? "text-blue-400 bg-blue-400/10"
                                                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                                        }`}
                                    >
                                        <Icon
                                            size={16}
                                            className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                                        />
                                        <span className="font-medium">
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse" />
                                        )}
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:to-purple-400/10 transition-all duration-300" />
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Social Links */}
                        <div className={`flex items-center space-x-2 sm:space-x-3 transition-all duration-700 ${
                            scrolled ? "transform scale-90" : "transform scale-100"
                        }`}>
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-1.5 sm:p-2 rounded-lg bg-gray-800/40 backdrop-blur-sm text-gray-400 transition-all duration-500 hover:scale-110 hover:rotate-6 hover:bg-gray-700/50 hover:shadow-lg hover:backdrop-blur-md ${social.color} group border border-gray-700/30 hover:border-gray-600/50`}
                                        title={social.name}
                                    >
                                        <Icon
                                            size={16}
                                            className="transition-all duration-300 group-hover:scale-110 drop-shadow-sm sm:w-[18px] sm:h-[18px]"
                                        />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Mobile Menu Button */}
                        <button className={`md:hidden p-1.5 sm:p-2 rounded-lg bg-gray-800/40 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-500 border border-gray-700/30 hover:border-gray-600/50 hover:shadow-md ${
                            scrolled ? "transform scale-90" : "transform scale-100"
                        }`}>
                            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                                <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
                                <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
                                <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Animated border bottom with gradient */}
                <div
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent transition-all duration-1000 ease-out ${
                        scrolled ? "w-full opacity-100 shadow-lg shadow-blue-400/30" : "w-0 opacity-0"
                    }`}
                />
                
                {/* Subtle glow effect when scrolled */}
                <div
                    className={`absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent transition-all duration-700 pointer-events-none ${
                        scrolled ? "opacity-100" : "opacity-0"
                    }`}
                />
            </header>

            {/* Spacer to prevent content jump */}
            <div className="h-24" />
        </>
    );
};

export default Header;