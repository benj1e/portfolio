import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BsFileEarmarkArrowDown } from "react-icons/bs";

const Info = () => {
    return (
        <div className="flex flex-col gap-4 w-1/2 h-full ps-20 pt-10">
            <div className="flex items-center px-10 gap-12 py-10 ">
                <img
                    src="https://i.ibb.co/0r00000/profile.png"
                    alt="profile"
                    className="rounded-lg w-60 h-60 object-cover"
                />

                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl">Benjamin Alimele</h1>
                    <span className="text-gray-400">Software Developer</span>
                    <div className="flex gap-6 items-center mt-4">
                        <a
                            href="../assets/Resume.pdf"
                            className="border border-gray-700 flex items-center gap-2 hover:bg-gray-800 text-white px-4 py-1 rounded-md transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            Resume <BsFileEarmarkArrowDown />
                        </a>
                        <span className="text-gray-400 text-2xl w-fit flex gap-4">
                            <a
                                href="https://github.com/benj1e"
                                className="text-gray-400 hover:text-gray-200 w-fit"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/omoroje/"
                                className="text-gray-400 hover:text-gray-200 w-fit"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href="mailto:benjaminali968@gmail.com"
                                className="text-gray-400 hover:text-gray-200 w-fit"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MdOutlineMailOutline />
                            </a>
                        </span>
                    </div>
                    <span className="flex items-center gap-2 mt-6 rounded-full bg-blue-400/25 px-3 py-1 w-fit">
                        <CiLocationOn /> Halifax, NS
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Info;
