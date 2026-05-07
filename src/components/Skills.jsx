import Section from "./widgets/Section";
import Headings from "./widgets/Headings";
import React from "react";

const Skills = () => {
    const skills = [
        "python",
        "django",
        "fastapi",
        "javascript",
        "react",
        "nextjs",
        "typescript",
        "java",
        "sql",
        "r",
        "html",
        "css",
        "tailwindcss",
        "git",
        "dart",
        "flutter",
        "docker",
        "supabase",
        "pytorch",
        "opencv",
        "numpy",
        "pandas",
    ].map((tool) => ({
        title:
            tool === "nextjs"
                ? "Next.js"
                : tool === "pytorch"
                ? "PyTorch"
                : tool === "opencv"
                ? "OpenCV"
                : tool === "r"
                ? "R"
                : tool.charAt(0).toUpperCase() +
                  tool
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim(),
        logo: `./logos/${tool}.svg`,
    }));

    return (
        <Section className="mt-5 cursor-default" id={"skills"}>
            <Headings text="skills" />
            <ul className="flex gap-x-2 gap-y-2 sm:gap-x-3 justify-center flex-wrap">
                {skills.map((skill, index) => (
                    <li
                        key={index}
                        className="text-gray-400 font-links-light rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner px-3 py-1 sm:px-4 flex items-center justify-center gap-2 flex-shrink-0"
                    >
                        <img
                            src={skill.logo}
                            className="w-4 h-4 flex-shrink-0"
                            alt=""
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <span className="text-sm sm:text-base whitespace-nowrap">
                            {skill.title}
                        </span>
                    </li>
                ))}
            </ul>
        </Section>
    );
};

export default Skills;
