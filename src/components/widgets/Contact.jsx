import React from "react";
import { FaLinkedinIn, FaPhone, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
const Contact = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-sm mx-auto p-4 rounded-none shadow-sm sm:p-6 bg-transparent">
                <h5 className="mb-3 text-base font-semibold text-white md:text-xl">
                    Get in touch
                </h5>
                <p className="text-sm font-normal text-white">
                    Connect with me through any of these platforms or reach out
                    directly.
                </p>
                <ul className="my-4 space-y-3">
                    {/* LinkedIn */}
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-3 text-base font-bold text-white rounded-none bg-transparent hover:bg-gray-800 group hover:shadow"
                        >
                            <FaLinkedinIn className="h-5 w-5 text-blue-400" />
                            <span className="flex-1 ms-3 whitespace-nowrap">
                                LinkedIn
                            </span>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-200 bg-gray-700 rounded-none">
                                Professional
                            </span>
                        </a>
                    </li>
                    {/* Twitter/X
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-3 text-base font-bold text-white rounded-none bg-transparent hover:bg-gray-800 group hover:shadow"
                        >
                            <FaXTwitter className="h-5 w-5 text-white" />

                            <span className="flex-1 ms-3 whitespace-nowrap">
                                Twitter / X
                            </span>
                        </a>
                    </li> */}
                    {/* GitHub */}
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-3 text-base font-bold text-white rounded-none bg-transparent hover:bg-gray-800 group hover:shadow"
                        >
                            <FaGithub className="h-5 w-5 text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">
                                GitHub
                            </span>
                        </a>
                    </li>
                    {/* Email */}
                    <li>
                        <a
                            href="mailto:"
                            className="flex items-center p-3 text-base font-bold text-white rounded-none bg-transparent hover:bg-gray-800 group hover:shadow"
                        >
                            <SiGmail className="h-5 w-5 text-red-500" />
                            <span className="flex-1 ms-3 whitespace-nowrap">
                                Email
                            </span>
                        </a>
                    </li>
                    {/* Phone */}
                    <li>
                        <a
                            href="tel:"
                            className="flex items-center p-3 text-base font-bold text-white rounded-none bg-transparent hover:bg-gray-800 group hover:shadow"
                        >
                            <FaPhone className="h-5 w-5 text-green-500" />
                            <span className="flex-1 ms-3 whitespace-nowrap">
                                Phone
                            </span>
                        </a>
                    </li>
                </ul>
                <div>
                    <a
                        href="#"
                        className="inline-flex items-center text-xs font-normal text-gray-200 hover:underline"
                    >
                        <svg
                            className="w-3 h-3 me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        How to reach me effectively?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
