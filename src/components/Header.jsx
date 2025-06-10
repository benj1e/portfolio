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

// The App component is for demonstration purposes to make the preview work.
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("about");

    // --- Typing Animation State ---
    const [typedText, setTypedText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const targetText = "benjamin_alimele()";
    const [animationPhase, setAnimationPhase] = useState("TYPING");

    // --- Animation Configuration ---
    const TYPING_SPEED_MS = 120;
    const PAUSE_DURATION_MS = 3000;
    const DELETING_SPEED_MS = 80;

    // --- SVG Data URI for the custom cursor ---
    // You can replace this with your own SVG by converting it to a data URI.
    const customCursorSVG = `data:image/svg+xml;base64,${btoa(`
        <?xml version="1.0" standalone="no"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
        "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="500.000000pt" height="500.000000pt" viewBox="0 0 500.000000 500.000000"
        preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
        fill="#000000" stroke="none">
        <path d="M2030 3515 l0 -75 -75 0 -75 0 0 -155 0 -155 75 0 75 0 0 155 0 155
        80 0 80 0 0 75 0 75 -80 0 -80 0 0 -75z"/>
        <path d="M2500 3515 l0 -74 -77 -3 -78 -3 -3 -152 -3 -153 81 0 80 0 0 155 0
        155 80 0 80 0 0 75 0 75 -80 0 -80 0 0 -75z"/>
        <path d="M2970 3515 l0 -74 -77 -3 -78 -3 -3 -152 -3 -153 81 0 80 0 0 155 0
        155 75 0 75 0 0 75 0 75 -75 0 -75 0 0 -75z"/>
        <path d="M2030 2965 l0 -156 78 3 77 3 3 153 3 152 -81 0 -80 0 0 -155z"/>
        <path d="M2500 2965 l0 -156 78 3 77 3 3 153 3 152 -81 0 -80 0 0 -155z"/>
        <path d="M2970 2965 l0 -155 75 0 75 0 0 155 0 155 -75 0 -75 0 0 -155z"/>
        <path d="M1720 2270 l0 -390 75 0 75 0 0 310 0 310 630 0 630 0 0 -310 0 -310
        230 0 230 0 0 310 0 310 -155 0 -155 0 0 80 0 80 -780 0 -780 0 0 -390z m1720
        -85 l0 -155 -80 0 -80 0 0 155 0 155 80 0 80 0 0 -155z"/>
        <path d="M1880 1795 l0 -75 -160 0 -160 0 0 -155 0 -155 80 0 80 0 0 -80 0
        -80 780 0 780 0 0 80 0 80 80 0 80 0 0 155 0 155 -160 0 -160 0 0 75 0 75 -75
        0 -75 0 0 -75 0 -75 -470 0 -470 0 0 75 0 75 -75 0 -75 0 0 -75z m1400 -310
        l0 -75 -780 0 -780 0 0 75 0 75 780 0 780 0 0 -75z"/>
        </g>
        </svg>
    `)}`;

    // --- Custom Cursor Handlers ---
    const activateCustomCursor = () => {
        document.body.classList.add("custom-cursor");
    };
    const deactivateCustomCursor = () => {
        document.body.classList.remove("custom-cursor");
    };

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
            {/* Style tag to define the custom cursor */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out font-main ${
                    scrolled
                        ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 py-3 shadow-lg shadow-gray-900/20"
                        : "bg-transparent py-6"
                }`}
            >
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        {/* Animated Logo/Name with custom cursor hover */}
                        <div
                            className={`transition-all duration-500 ${
                                scrolled ? "scale-90" : "scale-100"
                            }`}
                        >
                            <h1 className="text-2xl font-bold text-white font-mono2 h-8">
                                <span className="text-green-400 ">
                                    {typedText}
                                </span>
                                <span
                                    className={`inline-block w-0.5 h-6 bg-green-400 ml-1 -mb-1 transition-opacity duration-100 ${
                                        cursorVisible
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                ></span>
                            </h1>
                        </div>

                        {/* Navigation with custom cursor hover */}
                        <nav className="hidden md:flex items-center space-x-1 font-links-light">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 group ${
                                            isActive
                                                ? "text-blue-400 bg-blue-400/10"
                                                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                                        }`}
                                    >
                                        <Icon
                                            size={16}
                                            className="transition-transform group-hover:scale-110"
                                        />
                                        <span className="font-medium">
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse" />
                                        )}
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:to-purple-400/10 transition-all duration-300" />
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Social Links */}
                        <div className="flex items-center space-x-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2 rounded-lg bg-gray-800/50 text-gray-400 transition-all duration-300 hover:scale-110 hover:rotate-6 hover:bg-gray-700/50 ${social.color} group`}
                                        title={social.name}
                                    >
                                        <Icon
                                            size={18}
                                            className="transition-transform group-hover:scale-110"
                                        />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300">
                            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                                <div className="w-full h-0.5 bg-current"></div>
                                <div className="w-full h-0.5 bg-current"></div>
                                <div className="w-full h-0.5 bg-current"></div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Animated border bottom */}
                <div
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent transition-all duration-500 ${
                        scrolled ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                />
            </header>

            {/* Spacer to prevent content jump */}
            <div className="h-24" />
        </>
    );
};

export default Header;
