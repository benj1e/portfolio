import React from "react";

const menuItems = [
    { label: "Home", path: "/portfolio" },
    { label: "My Career", path: "/portfolio/career" },
    { label: "Build Log", path: "/portfolio/projects" },
    { label: "Squad", path: "/portfolio/squad" },
    { label: "Contact", path: "/portfolio/contact" },
];

export default function Menu() {
    return (
        <nav className="text-white w-fit md:w-64 py-6 px-4 font-links text-lg ms-10 h-full">
            <ul className="space-y-4">
                {menuItems.map(({ label, path }) => (
                    <li key={label}>
                        <a
                            to={path}
                            className={({ isActive }) =>
                                `cursor-pointer px-2 py-2 rounded-lg transition-all w-fit block font-links-light ${
                                    isActive
                                        ? "text-white font-bold"
                                        : "hover:text-xl text-white/70"
                                }`
                            }
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
