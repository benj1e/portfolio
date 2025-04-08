import React from "react";

const Navbar = () => {
    return (
        <nav className="w-full flex justify-between">
            <ul className="flex gap-4 items-center py-8 text-gray-400">
                <li className="uppercase font-fira-code text-3xl font-bold">
                    <a href="/" className="hover:text-gray-200">Benji</a>
                </li>   
            </ul>
            <ul className="flex gap-4 items-center py-8 justify-between text-gray-400 text-xl">
                <li>
                    <a href="#" className="hover:text-gray-200">
                        home
                    </a>
                </li>
                <li>
                    <a href="#" className="hover:text-gray-300">
                        projects
                    </a>
                </li>
                <li>
                    <a href="#" className="hover:text-gray-200">
                        contact
                    </a>
                </li>
                <li>
                    <button className="text-yellow-500 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
