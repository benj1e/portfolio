import React, { useState, useEffect } from "react";
import Section from "./widgets/Section";

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

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("/portfolio/projects.json")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error("Error loading projects:", err));
    }, []);

    console.log("Projects component rendered with projects:", projects);

    return (
        <Section>
            <h2 className="font-mono2 text-2xl mb-4">projects</h2>
            <div className="mx-auto w-full flex flex-wrap gap-4 justify-center px-4">
                {projects.length === 0 ? (
                    <NoProject />
                ) : (
                    projects.slice(0, 2).map((project, index) => (
                        <div
                            key={index}
                            className="w-2/5 flex-auto bg-white/10 border border-white/15 rounded-xl shadow-lg p-4 flex flex-col gap-4"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="rounded-lg object-cover h-48 w-full border border-gray-700"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://placehold.co/400x300?text=Preview";
                                }}
                            />

                            <div>
                                <h3 className="text-xl font-main text-white">
                                    {project.title}
                                </h3>
                                <p className="mt-1 text-gray-400 font-links-light text-sm">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(project.tags) &&
                                    project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-gray-400 text-xs font-links-light rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner
                                                px-2 py-0 flex items-center justify-center gap-2"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.website && (
                                    <a
                                        href={project.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm px-3 py-1 rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
                                    >
                                        Website
                                    </a>
                                )}
                                {project.source && (
                                    <a
                                        href={project.source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm px-3 py-1 rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
                                    >
                                        Source
                                    </a>
                                )}
                                {project.ui && (
                                    <a
                                        href={project.ui}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm px-3 py-1 rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
                                    >
                                        Source (UI)
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Section>
    );
};

export default Projects;
