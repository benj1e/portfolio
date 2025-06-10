import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

// Mock SyntaxHighlighter for demo purposes
const SyntaxHighlighter = ({ children, language, style, customStyle }) => (
    <pre style={customStyle} className="text-sm">
        <code className="text-gray-300">{children}</code>
    </pre>
);

export default function CodeBlock({
    code,
    language = "javascript",
    className = "",
    customStyle = {},
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
        <>
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                @keyframes glow-border {
                    0%,
                    100% {
                        box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
                    }
                }

                .shimmer-effect {
                    animation: shimmer 0.6s ease-in-out;
                }

                .glow-border:hover {
                    animation: glow-border 2s ease-in-out infinite;
                }

                .copy-button-glow:hover {
                    text-shadow: 0 0 8px rgba(147, 197, 253, 0.8);
                }
            `}</style>

            <div
                className={`
                    relative bg-[#282c34] rounded-lg overflow-hidden my-4 
                    transition-all duration-300 ease-in-out
                    hover:shadow-lg hover:shadow-blue-500/20
                    border-2 border-gray-700 hover:border-blue-400/50
                    glow-border group
                    ${className}
                `}
                style={customStyle}
            >
                {/* Shimmer overlay */}
                <div
                    className="
                    absolute inset-0 
                    bg-gradient-to-r from-transparent via-white/5 to-transparent
                    -translate-x-full group-hover:shimmer-effect
                    transition-transform duration-600 ease-in-out
                    pointer-events-none
                    z-10
                "
                />

                {/* Header */}
                <div
                    className="
                    flex justify-between items-center px-4 py-2 
                    bg-[#1e1e1e] text-sm text-gray-300 font-mono 
                    border-b-2 border-gray-700
                    relative z-20
                "
                >
                    <span
                        className="
                        text-blue-400 font-semibold
                        group-hover:drop-shadow-[0_0_4px_rgba(96,165,250,0.6)]
                        transition-all duration-300
                    "
                    >
                        {language}
                    </span>

                    <button
                        onClick={handleCopy}
                        className="
                            flex items-center gap-1 text-gray-400 
                            hover:text-white copy-button-glow
                            transition-all duration-300
                            hover:scale-105 active:scale-95
                            px-2 py-1 rounded
                            hover:bg-gray-700/50
                        "
                    >
                        {copied ? (
                            <>
                                <Check size={16} className="text-green-400" />
                                <span className="text-green-400">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={16} />
                                Copy
                            </>
                        )}
                    </button>
                </div>

                {/* Code content */}
                <div className="relative z-20">
                    <SyntaxHighlighter
                        language={language}
                        style={{}}
                        customStyle={{
                            margin: 0,
                            padding: "1em",
                            fontSize: "0.875rem",
                            background: "transparent",
                            fontFamily:
                                "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>

                {/* Bottom accent line */}
                <div
                    className="
                    absolute bottom-0 left-0 right-0 h-0.5
                    bg-gradient-to-r from-transparent via-blue-400/50 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                "
                />
            </div>
        </>
    );
}

// Demo component to show the enhanced CodeBlock
export function CodeBlockDemo() {
    const sampleCode = `function greet(name) {
    console.log(\`Hello, \${name}!\`);
    return \`Welcome to the enhanced code block!\`;
}

// Call the function
const message = greet('Developer');
console.log(message);`;

    const reactCode = `import React, { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div className="p-4">
            <h2>Count: {count}</h2>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}`;

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-white mb-8">
                    Enhanced CodeBlock with Shiny Effects
                </h1>

                <CodeBlock code={sampleCode} language="javascript" />

                <CodeBlock code={reactCode} language="jsx" />

                <CodeBlock
                    code="npm install react-syntax-highlighter lucide-react"
                    language="bash"
                />
            </div>
        </div>
    );
}
