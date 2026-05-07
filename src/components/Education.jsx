import React, { useState, useEffect } from "react";
import CodeBlock from "./widgets/CodeBlock";
import Section from "./widgets/Section";

const EducationDetails = ({ data }) => {
    return (
        <>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {data.map((edu, idx) => (
                    <li key={idx} className="mb-10 ms-7">
                        <span className="font-links-light text-xl">
                            {edu.institution}
                        </span>
                        <h3 className="font-special flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                            {edu.degree}
                            {edu.gpa && (
                                <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300 ms-3">
                                    GPA: {edu.gpa}
                                </span>
                            )}
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {edu.startDate} - {edu.endDate} | {edu.location}
                        </time>
                        <CodeBlock
                            code={Array.isArray(edu.description)
                                ? edu.description.map(line => line.startsWith("-") ? line : `- ${line}`).join("\n")
                                : edu.description}
                            language="markdown"
                        />
                    </li>
                ))}
            </ol>
        </>
    );
};

const Education = () => {
    const [educationData, setEducationData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/portfolio/education.json")
            .then((res) => res.json())
            .then((data) => setEducationData(data))
            .catch(() => setEducationData([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-20 text-gray-400">
                Loading education data...
            </div>
        );
    }

    return (
        <Section id={"education"}>
            <h2 className="text-2xl mb-4 font-mono2">education</h2>
            {educationData.length > 0 && <EducationDetails data={educationData} />}
        </Section>
    );
};

export default Education;
