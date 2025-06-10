import React, { useState, useEffect } from "react";
import CodeBlock from "./widgets/CodeBlock";

const JobDetails = ({ data }) => {
    return (
        <>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {data.map((job, idx) => (
                    <li key={idx} className="mb-10 ms-7">
                        {job.logo && (
                            <img
                                src={job.logo}
                                className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-8 ring-black"
                                alt={`${job.company} logo`}
                            />
                        )}
                        <span className="font-links-light text-xl">
                            {job.company}
                        </span>
                        <h3 className="font-special flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                            {job.title}
                            {job.latest && (
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 ms-3">
                                    Latest
                                </span>
                            )}
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {job.startDate} -{" "}
                            {job.latest ? "Present" : job.endDate}
                        </time>
                        <CodeBlock code={job.description} language="markdown" />
                    </li>
                ))}
            </ol>
        </>
    );
};

const NoJob = () => {
    const [showBrainrot, setShowBrainrot] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowBrainrot(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    return showBrainrot ? (
        <div className="flex text-2xl font-bold font-special text-gray-700 flex-col items-center justify-center">
            <span>NO J*B DETECTED</span>
            <span>WE (yes WE) are ALL staying UN*MPLOYED</span>
        </div>
    ) : (
        <>
            <div className="flex flex-col items-center justify-center text-center text-gray-400 font-mono2">
                <h1 className="text-5xl font-bold text-red-400">404</h1>
                <p className="text-xl mt-2">Career data not found.</p>
                <p className="mt-1 text-sm text-gray-500">
                    We looked everywhere. Even under the couch. <br />
                    <span className="font-special">
                        (ts was ai-generated 🥀)
                    </span>
                </p>
            </div>
        </>
    );
};

const MyCareer = () => {
    const [careerData, setCareerData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/portfolio/career.json")
            .then((res) => res.json())
            .then((data) => setCareerData(data))
            .catch(() => setCareerData([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-20 text-gray-400">
                Loading career data...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-1/2 min-w-2/5 p-4 mt-4">
            <h2 className="text-2xl mb-4 font-mono2">experience</h2>

            {careerData.length === 0 ? (
                <NoJob />
            ) : (
                <JobDetails data={careerData} />
            )}
        </div>
    );
};

export default MyCareer;
