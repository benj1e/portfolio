import React, { useState } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react"; // Replace with your preferred icon lib if needed

export default function CodeBlockV2({
    code,
    language = "javascript",
    theme = atomDark,
    className = "",
    customStyle = {},
    showCopy = true,
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            console.error("Copy failed", e);
        }
    };

    return (
        <div
            className={`relative font-bold my-2 sm:my-4 rounded-md overflow-hidden bg-[#1e1e1e] border border-[#2a2a2a] w-full ${className}`}
        >
            {showCopy && (
                <button
                    onClick={handleCopy}
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 text-gray-400 hover:text-white z-10 p-1 rounded transition-colors duration-200 hover:bg-gray-700/50"
                    title="Copy code"
                >
                    {copied ? (
                        <Check
                            size={16}
                            className="text-green-400 sm:w-[18px] sm:h-[18px]"
                        />
                    ) : (
                        <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />
                    )}
                </button>
            )}

            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language}
                    style={theme}
                    customStyle={{
                        margin: 0,
                        padding: "0.75rem",
                        background: "transparent",
                        fontSize: "0.75rem",
                        lineHeight: 1.5,
                        minWidth: "100%",
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                        "@media (min-width: 640px)": {
                            padding: "1rem",
                            fontSize: "0.875rem",
                            lineHeight: 1.6,
                            whiteSpace: "pre",
                        },
                        ...customStyle,
                    }}
                    showLineNumbers={false}
                    wrapLines={true}
                    wrapLongLines={true}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
