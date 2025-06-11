import React from "react";
import CodeBlock from "./widgets/CodeBlock";
import CodeBlockV2 from "./widgets/CodeBlockV2";
import CodeButton from "./widgets/CodeButton";
import Headings from "./widgets/Headings";
import Section from "./widgets/Section";

// Extracted HeroGreeting component for better code organization
function HeroGreeting() {
    const consoleGreeting = `$ booting developer profile...
> welcome to benji's world
> system status: 🟢 online
> user: Benjamin Alimele
> motto: "Code. Learn. Ship. Repeat."
`;

    return (
        <div className="w-full font-body text-white">
            <CodeBlock
                language="bash"
                code={consoleGreeting}
                className="shadow-md cursor-default"
            />
        </div>
    );
}

// Extracted ContentSection component
function ContentSection() {
    return (
        <div className="flex flex-col min-h-fit md:space-y-4 xs:space-y-0 sm:space-y-1 lg:space-y-6">
            <div className="flex-1">
                <HeroGreeting />
                <CodeBlock
                    language="txt"
                    code="I am a backend dev, moving towards AI applications."
                    className="shadow-md cursor-default font-mono2"
                />
            </div>

            <CodeButton className="font-mono2 w-full sm:w-auto" />
        </div>
    );
}

function HeroSection() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-x-4 sm:gap-x-6 xs:gap-x-2 ">
            <img
                src="https://placehold.co/300x300"
                height={300}
                width={300}
                className="rounded max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] h-auto"
                alt="Benjamin Alimele pic"
            />
            <ContentSection />
        </div>
    );
}
const Home = () => {
    return (
        <Section>
            {/* Main container with responsive padding */}
            {/* Header */}
            <Headings text="intro" />
            <HeroSection />
        </Section>
    );
};

export default Home;
