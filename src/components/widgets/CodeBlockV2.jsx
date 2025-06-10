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
    showCopy = true, // << Toggle copy button
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
            className={`relative  font-bold my-4 rounded-md overflow-hidden bg-[#1e1e1e] border border-[#2a2a2a] ${className}`}
        >
            {showCopy && (
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white z-10"
                    title="Copy code"
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
            )}

            <SyntaxHighlighter
                language={language}
                style={theme}
                customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "transparent",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    ...customStyle,
                }}
                showLineNumbers={false}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
