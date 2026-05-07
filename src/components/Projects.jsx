import React, { useState, useEffect } from "react";
import Section from "./widgets/Section";
import DinoSVG from "./widgets/DinoSVG";
import CodeBlock from "./widgets/CodeBlock";
import { Github, Globe } from "lucide-react";

const NoProject = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center text-gray-400 font-mono2">
                <h1 className="text-5xl font-mono2 text-red-400">🥀</h1>
                <p className="text-xl mt-2">Projects not started.</p>
                <small className="text-xs font-special text-gray-500">
                    (give me a week)
                </small>
            </div>
        </>
    );
};

const ProjectImage = ({ project }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    if (imageError || !project.image) {
        return (
            <div className="rounded-sm h-40 sm:h-48 w-full border border-white/20 flex items-center justify-center">
                <div className="w-12 h-auto opacity-60">
                    <DinoSVG />
                </div>
            </div>
        );
    }

    return (
        <img
            src={project.image}
            alt={project.title}
            className="rounded-sm object-cover h-40 sm:h-48 w-full border border-gray-700"
            onError={handleImageError}
        />
    );
};

const ProjectCard = ({ project }) => {
    return (
        <div className="w-full sm:w-[calc(50%-0.5rem)] md:flex-1 lg:w-2/5 flex-none bg-white/10 border border-white/15 rounded-xl shadow-lg p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 min-w-0">
            <ProjectImage project={project} />

            <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-main text-white truncate">
                    {project.title}
                </h3>
                <p className="mt-1 text-gray-400 font-links-light text-sm leading-relaxed">
                    {project.description}
                </p>
            </div>

            {project.extensiveDescription && (
                <div className="mt-1">
                    <CodeBlock
                        code={Array.isArray(project.extensiveDescription)
                            ? project.extensiveDescription.map(line => line.startsWith("-") ? line : `- ${line}`).join("\n")
                            : project.extensiveDescription}
                        language="markdown"
                    />
                </div>
            )}

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                {Array.isArray(project.tags) &&
                    project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-gray-400 text-xs font-links-light rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner
                                px-2 py-1 flex items-center justify-center gap-2 flex-shrink-0"
                        >
                            {tag}
                        </span>
                    ))}
            </div>

            <div className="flex flex-wrap gap-2 font-main">
                {project.website && (
                    <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center justify-center gap-2 sm:text-sm px-2 sm:px-3 py-1 rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
                    >
                        <Globe className="w-4" />
                        Website
                    </a>
                )}
                {project.source && (
                    <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center justify-center gap-2 sm:text-sm px-2 sm:px-3 py-1 rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
                    >
                        <Github className="w-4" />
                        Source
                    </a>
                )}
            </div>
        </div>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("/portfolio/projects.json")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error("Error loading projects:", err));
    }, []);

    return (
        <Section id={"projects"}>
            <h2 className="font-mono2 text-2xl mb-4">projects</h2>
            <div className="mx-auto w-full flex flex-wrap gap-3 sm:gap-4 justify-center px-2 sm:px-4">
                {projects.length === 0 ? (
                    <NoProject />
                ) : (
                    projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))
                )}
            </div>
        </Section>
    );
};

export default Projects;
