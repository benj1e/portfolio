import React from "react";

const menuItems = ["Home", "My Career", "Projects", "Squad", "Contact"];

export default function Menu({ selected, onSelect }) {
    return (
        <nav className="text-white w-fit md:w-64 py-6 px-4 font-links text-lg ms-10 h-full">
            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <li
                        key={item}
                        className={`cursor-pointer px-2 py-2 rounded-lg transition-all w-fit ${
                            selected === item
                                ? "text-white font-bold font-links-light"
                                : "hover:text-xl font-links-light text-white/70"
                        }`}
                        onClick={() => onSelect(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
