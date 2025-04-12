import React from "react";
import { FaHtml5, FaPython, FaCss3Alt, FaJs, FaReact } from "react-icons/fa";
import {
    SiDjango,
    SiFastapi,
    SiFlask,
    SiPandas,
    SiMysql,
    SiNumpy,
    SiScrapy,
    SiTailwindcss,
    SiGit,
    SiSqlite,
    SiHtmx,
} from "react-icons/si";

const Skills = () => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Skills</h2>
            <div className="flex flex-col gap-3 font-fira-code">
                <div className="flex gap-2 w-full">
                    <span className="px-6 py-2 w-full rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <FaPython className="text-2xl" />
                        .py
                    </span>
                    <span className="px-6 py-2 w-full rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <FaHtml5 className="text-2xl" />
                        .html
                    </span>
                    <span className="px-6 py-2 w-full rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <FaCss3Alt className="text-2xl" />
                        .css
                    </span>
                    <span className="px-6 py-2 w-full rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <FaJs className="text-2xl" />
                        .js
                    </span>
                </div>
                <hr className="w-full border-gray-700" />
                <div className="flex flex-wrap gap-2 w-full">
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <FaReact className="text-2xl" />
                        React
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiDjango className="text-2xl" />
                        django
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiFastapi className="text-2xl" />
                        FastAPI
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiFlask className="text-2xl" />
                        Flask
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiMysql className="text-2xl" />
                        MySQL
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiPandas className="text-2xl" />
                        Pandas
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiNumpy className="text-2xl" />
                        Numpy
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiScrapy className="text-2xl" />
                        Scrapy
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiTailwindcss className="text-2xl" />
                        TailwindCSS
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiGit className="text-2xl" />
                        Git
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiSqlite className="text-2xl" />
                        SQLite
                    </span>
                    <span className="px-6 py-2 rounded-md flex flex-col text-xs items-center gap-2 border border-gray-700">
                        <SiHtmx className="text-2xl" />
                        HTMX
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Skills;
