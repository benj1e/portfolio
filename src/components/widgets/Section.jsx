import React from "react";

const Section = ({ children }) => {
    return (
        <div className="min-h-fit w-full lg:min-w-2/5 lg:max-w-1/2 mx-auto">
            <div className="container mx-auto p-4 sm:px-6 lg:px-8 xs:p-2">

            {children}

            </div>
        </div>
    );
};

export default Section;
