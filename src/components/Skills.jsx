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
        logo: `src/assets/logos/${tool}.svg`,
    }));

    return (
        <div className="min-w-2/5 max-w-1/2 mx-auto mt-5 p-4 cursor-default">
            <h2 className="text-2xl mb-4 font-mono2">skills</h2>
            <ul className="flex gap-x-3 justify-center flex-wrap">
                {skills.map((skill, index) => (
                    <li
                        key={index}
                        className="
                            text-gray-400 
                            font-links-light 
                            rounded-xl 
                            mb-2 
                            bg-white/10 
                            backdrop-blur-md 
                            border border-white/10 
                            shadow-inner
                            px-4 py-1 flex items-center justify-center gap-2
                        "
                    >
                        <img src={skill.logo} className="w-4 h-4" />
                        {skill.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Skills;
