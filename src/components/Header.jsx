import {
    Github,
    Linkedin,
    Mail,
    Code,
    User,
    Briefcase,
    MessageCircle,
    X,
    Menu,
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

const Header = ({ scrolled }) => {
    // State for tracking the active section for nav highlighting
    const [activeSection, setActiveSection] = useState("about");
    // State for mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // --- Typing Animation State ---
    const [typedText, setTypedText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const fullText = "benjamin_alimele()";
    const shortText = "benji()";
    const [targetText, setTargetText] = useState(fullText);
    const [animationPhase, setAnimationPhase] = useState("TYPING");

    // --- Animation Configuration ---
    const TYPING_SPEED_MS = 100;
    const PAUSE_DURATION_MS = 3500;
    const DELETING_SPEED_MS = 70;

    // --- Utility Functions ---

    // Function to scroll to a specific section on the page
    const scrollToSection = (sectionId) => {
        // Close the mobile menu if it's open
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
        const element = document.getElementById(sectionId);
        console.log("Scrolling to section:", sectionId, element);
        if (element) {
            // A slight offset to account for the fixed header height
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    // --- useEffect Hooks for Core Functionality ---

    // Effect for handling screen resizing, primarily for the typing animation text
    useEffect(() => {
        const checkScreenSize = () => {
            const isSmall = window.innerWidth < 850; // Tailwind's 'md' breakpoint
            setTargetText(isSmall ? shortText : fullText);
        };

        checkScreenSize(); // Initial check
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [shortText, fullText]); // Reruns if these constant strings were to change

    // Effect to reset typing animation when the target text changes (on screen resize)
    useEffect(() => {
        setTypedText("");
        setAnimationPhase("TYPING");
    }, [targetText]);

    // Effect for the repeating typing animation state machine
    useEffect(() => {
        let timer;
        switch (animationPhase) {
            case "TYPING":
                if (typedText.length < targetText.length) {
                    timer = setTimeout(() => {
                        setTypedText(targetText.slice(0, typedText.length + 1));
                    }, TYPING_SPEED_MS);
                } else {
                    timer = setTimeout(
                        () => setAnimationPhase("PAUSING"),
                        PAUSE_DURATION_MS
                    );
                }
                break;
            case "PAUSING":
                timer = setTimeout(() => {
                    setAnimationPhase("DELETING");
                }, PAUSE_DURATION_MS);
                break;
            case "DELETING":
                if (typedText.length > 0) {
                    timer = setTimeout(() => {
                        setTypedText(typedText.slice(0, typedText.length - 1));
                    }, DELETING_SPEED_MS);
                } else {
                    setAnimationPhase("TYPING");
                }
                break;
            default:
                break;
        }
        return () => clearTimeout(timer);
    }, [typedText, animationPhase, targetText]);

    // Effect for the blinking cursor visibility
    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setCursorVisible((v) => !v);
        }, 500);
        return () => clearInterval(cursorTimer);
    }, []);

    // --- Data for Navigation and Socials ---
    const navItems = [
        { id: "about", label: "About", icon: User },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "projects", label: "Projects", icon: Code },
        { id: "connect", label: "Contact", icon: MessageCircle },
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

    // --- Render Logic ---
    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out font-main bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/30 sm:py-3 shadow-2xl shadow-gray-900/30 py-6
                `}
                style={{
                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.05) 100%)",
                }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        {/* Animated Logo/Name */}
                        <div
                            className={`transition-all duration-700 ease-out ${
                                scrolled ? "scale-90" : "scale-100"
                            }`}
                        >
                            <a
                                href="#about"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("about");
                                }}
                                className="cursor-pointer"
                            >
                                <h1
                                    className={`font-bold text-white font-mono2 h-8 transition-all duration-500 flex items-center ${
                                        scrolled
                                            ? "text-lg sm:text-xl"
                                            : "text-xl sm:text-2xl"
                                    }`}
                                >
                                    <span className="text-green-400 drop-shadow-lg">
                                        {typedText}
                                    </span>
                                    <span
                                        className={`inline-block w-0.5 bg-green-400 ml-1 transition-opacity duration-300 shadow-lg shadow-green-400/50 ${
                                            cursorVisible
                                                ? "opacity-100"
                                                : "opacity-0"
                                        } ${scrolled ? "h-5" : "h-6"}`}
                                    ></span>
                                </h1>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative px-4 py-2 rounded-lg font-links-light transition-all duration-300 flex items-center gap-2 group overflow-hidden ${
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
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Right-side container for Socials and Mobile Menu Button */}
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            {/* Social Links - hidden on mobile, shown on md screens and up */}
                            <div
                                className={`hidden sm:flex items-center space-x-2 sm:space-x-3 transition-all duration-700 ${
                                    scrolled
                                        ? "transform scale-90"
                                        : "transform scale-100"
                                }`}
                            >
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-1.5 sm:p-2 rounded-lg bg-gray-800/40 text-gray-400 transition-all duration-500 hover:scale-110 hover:rotate-6 hover:bg-gray-700/50 hover:shadow-lg ${social.color} group border border-gray-700/30 hover:border-gray-600/50`}
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
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`md:hidden p-1.5 sm:p-2 rounded-lg bg-gray-800/40 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-500 border border-gray-700/30 hover:border-gray-600/50 z-50 ${
                                    scrolled
                                        ? "transform scale-90"
                                        : "transform scale-100"
                                }`}
                                aria-label="Toggle Menu"
                            >
                                {isMenuOpen ? (
                                    <X size={20} />
                                ) : (
                                    <Menu size={20} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div
                    className={`absolute top-0 left-0 right-0 transition-transform duration-500 ease-in-out md:hidden font-links-light ${
                        isMenuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
                >
                    <div className="h-screen w-full bg-gray-900/95 backdrop-blur-lg pt-24 pb-8 px-4 flex flex-col">
                        <nav className="flex flex-col items-center justify-center flex-grow space-y-4">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`w-full max-w-xs text-center px-4 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 group text-xl ${
                                            isActive
                                                ? "text-blue-400 bg-blue-400/10"
                                                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                                        }`}
                                    >
                                        <Icon size={22} />
                                        <span className="font-medium">
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>
                        {/* Social Links for Mobile Menu */}
                        <div className="flex items-center justify-center space-x-4 pt-8">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 rounded-full bg-gray-800/40 text-gray-400 transition-all duration-500 hover:scale-110 hover:bg-gray-700/50 ${social.color} group border border-gray-700/30`}
                                        title={social.name}
                                    >
                                        <Icon
                                            size={20}
                                            className="drop-shadow-sm"
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Animated border bottom with gradient */}
                <div
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent transition-all duration-1000 ease-out ${
                        scrolled ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                />
            </header>

            {/* Spacer to prevent content from jumping under the fixed header */}
            {/* <div
                className={`transition-all duration-700 ease-out ${
                    scrolled ? "h-[76px]" : "h-[100px]"
                }`}
            /> */}
        </>
    );
};

export default Header;
