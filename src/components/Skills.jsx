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
        "sql",
        "html",
        "css",
        "tailwindcss",
        "git",
        "dart",
        "flutter",
        "docker",
    ].map((tool) => ({
        title:
            tool.charAt(0) +
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
