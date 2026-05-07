import React, { useState, useEffect } from "react";
import CodeBlock from "./widgets/CodeBlock";
import Section from "./widgets/Section";

const VolunteerDetails = ({ data }) => {
    return (
        <>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {data.map((item, idx) => (
                    <li key={idx} className="mb-10 ms-7">
                        <span className="font-links-light text-xl">
                            {item.organization}
                        </span>
                        <h3 className="font-special flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                            {item.title}
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {item.startDate} - {item.endDate} | {item.location}
                        </time>
                        <CodeBlock
                            code={Array.isArray(item.description)
                                ? item.description.map(line => line.startsWith("-") ? line : `- ${line}`).join("\n")
                                : item.description}
                            language="markdown"
                        />
                    </li>
                ))}
            </ol>
        </>
    );
};

const Volunteer = () => {
    const [volunteerData, setVolunteerData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/portfolio/volunteer.json")
            .then((res) => res.json())
            .then((data) => setVolunteerData(data))
            .catch(() => setVolunteerData([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-20 text-gray-400">
                Loading volunteer data...
            </div>
        );
    }

    return (
        <Section id={"volunteer"}>
            <h2 className="text-2xl mb-4 font-mono2">volunteer & leadership</h2>
            {volunteerData.length > 0 && <VolunteerDetails data={volunteerData} />}
        </Section>
    );
};

export default Volunteer;
