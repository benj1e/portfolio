import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { TfiDownload } from "react-icons/tfi";

const Home = () => {
    
    return (
        <div className="flex items-center justify-center h-full font-body">
            <div className="flex gap-4 items-center h-[250px] w-full max-w-2xl mx-auto p-4 rounded-none sm:p-6 bg-transparent">
                <img
                    src="https://placehold.co/300x300"
                    height={250}
                    width={250}
                    className="rounded"
                    alt=""
                />
                <div className="h-full flex flex-col justify-between ">
                    <div className="">
                        <span className="capitalize mb-auto text-3xl font-header">
                            Hi there!{" "}
                            <img src="./assets/soccer-ball.svg" alt="" /> <br />
                        </span>
                        <span className="mt-auto font-links-light">
                            I'm{" "}
                            <span className="font-special text-2xl">
                                Benjamin
                            </span>
                        </span>
                    </div>
                    <div className="mt-auto ">
                        <a
                            href="/resume.pdf"
                            download
                            className="mb-2 py-2 text-white duration-200 font-links-light hover:text-lg flex items-center gap-2 rounded-none px-4 shadow-md transition-all w-fit"
                        >
                            <TfiDownload />
                            Download Resume
                        </a>
                        <span className="text-md font-links-light flex items-center gap-2 border border-white rounded-full px-3 py-1 w-fit">
                            <CiLocationOn /> Nova Scotia, Canada
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
