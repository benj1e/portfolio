import { useState } from "react";
import React from "react";
import "./codeButton.css";

const CodeButton = ({
    displayText = "get_resume",
    name = "Benjamin Alimele",
    className = "",
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const downloadResume = () => {
        const link = document.createElement("a");
        link.href = "/portfolio/Resume.pdf"; // Put your resume.pdf in the public folder
        link.download = "Benjamin_Alimele_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setIsLoading(true);

        // Simulate download process
        setTimeout(() => {
            setIsLoading(false);
            // Add your actual download logic here
            // window.open('path/to/benjamin-alimele-resume.pdf', '_blank');
            alert("Resume download would start here!");
        }, 1500);
    };
    return (
        <button
            onClick={downloadResume}
            disabled={isLoading}
            className={
                "relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900  border-2 border-gray-700 hover:border-blue-400 rounded-lg  p-4  font-mono text-base font-medium  cursor-pointer  transform transition-all duration-300 ease-in-out  hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-400/20  active:translate-y-0  disabled:cursor-not-allowed disabled:opacity-75 group w-full " +
                className
            }
        >
            {/* Shine effect */}
            <div
                className="
              absolute inset-0 
              bg-gradient-to-r from-transparent via-white/10 to-transparent
              -translate-x-full group-hover:shimmer-effect
              transition-transform duration-500 ease-in-out
            "
            />

            <div className="relative flex items-center gap-2">
                <span className="text-green-400 font-bold">{">"}</span>

                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <span className="text-orange-400 typewriter overflow-hidden whitespace-nowrap">
                            Downloading...
                        </span>
                        <div className="flex gap-1">
                            <div
                                className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                                className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                                className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <span
                            className="
                    text-purple-400 function-glow
                    group-hover:drop-shadow-[0_0_8px_rgba(196,181,253,0.6)]
                    transition-all duration-300
                  "
                        >
                            {displayText}
                        </span>
                        <span className="text-orange-400 group-hover:drop-shadow-[0_0_4px_rgba(251,146,60,0.5)] transition-all duration-300">
                            (
                        </span>
                        <span className="text-green-400 group-hover:drop-shadow-[0_0_4px_rgba(74,222,128,0.5)] transition-all duration-300">
                            '
                        </span>
                        <span
                            className="
                    text-blue-300
                    group-hover:drop-shadow-[0_0_6px_rgba(147,197,253,0.4)]
                    transition-all duration-300
                  "
                        >
                            {name}
                        </span>
                        <span className="text-green-400 group-hover:drop-shadow-[0_0_4px_rgba(74,222,128,0.5)] transition-all duration-300">
                            '
                        </span>
                        <span className="text-orange-400 group-hover:drop-shadow-[0_0_4px_rgba(251,146,60,0.5)] transition-all duration-300">
                            )
                        </span>
                        <span
                            className="
                    text-blue-400 cursor-blink
                    ml-1
                  "
                        >
                            |
                        </span>
                    </>
                )}
            </div>
        </button>
    );
};

export default CodeButton;
