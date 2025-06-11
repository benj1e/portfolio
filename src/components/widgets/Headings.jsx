import React from "react";

const Headings = ({ text }) => {
    return (
        <h2 className="lg:mb-8 mb-4  text-center lg:text-left text-lg sm:text-xl lg:text-2xl font-mono2 underline sm:no-underline text-white">
            {text}
        </h2>
    );
};

export default Headings;
