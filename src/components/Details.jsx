import React from "react";
import Skills from "./Skills";
import Projects from "./Projects";

const Details = () => {
    return (
        <div className="flex flex-col px-14 py-20 w-1/2 h-full">
            <div className="flex flex-col gap-4">
                <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus odio eveniet deleniti earum eligendi pariatur
                    est ex dolorem aliquam doloribus, accusamus, voluptas,
                    dolore porro. Obcaecati quam voluptas earum autem totam?
                </span>
            </div>

            <Skills />
            
            <hr className="w-full border-gray-700 my-8" />
            <Projects />
        </div>
    );
};

export default Details;
