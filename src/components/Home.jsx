import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { TfiDownload } from "react-icons/tfi";
import CodeBlock from "./widgets/CodeBlock";
import CodeBlockV2 from "./widgets/CodeBlockV2";
import CodeButton from "./widgets/CodeButton";

function HeroGreeting() {
    const consoleGreeting = `> booting developer profile...
> welcome to benji's world
> ###############################
> system status: 🟢 online
> user: Benjamin Alimele
> motto: "Code. Learn. Ship. Repeat."
`;

    return (
        <div className="w-full mx-auto font-body text-white">
            <CodeBlock
                language="bash"
                code={consoleGreeting}
                className="shadow-md cursor-default"
            />
        </div>
    );
}

const Home = () => {
    return (
        <div className="flex items-start justify-center h-fit min-w-2/5 max-w-1/2 mx-auto font-body p-4">
            <h2 className="text-2xl mb-4 font-mono2">intro</h2>
            <div className="flex gap-4 items-start w-full max-w-2xl mx-auto p-4 rounded-none sm:p-6 bg-transparent">
                <div>
                    <img
                        src="https://placehold.co/300x300"
                        height={250}
                        width={250}
                        className="rounded"
                        alt=""
                    />
                    <CodeBlockV2
                        code={"📍NS -> Canada"}
                        theme={"atomDark"} // You can switch to atomDark, dracula, etc.
                        className="shadow-md font-mono2 cursor-default"
                        customStyle={{
                            borderRadius: "10px",
                            padding: "10px",
                        }}
                        showCopy={false}
                    />
                    {/* skills section */}
                    <div className="overflow-y-scroll h-[100px] w-full"></div>
                </div>
                <div className="min-h-full flex flex-col justify-between">
                    <div className="">
                        <HeroGreeting />
                        <CodeBlock
                            language={"txt"}
                            code={
                                "I am a backend dev, moving towards AI applications."
                            }
                            className="shadow-md cursor-default font-mono2"
                        />
                    </div>

                    <div className="mt-auto ">
                        <CodeButton className="font-mono2" />

                        {/* <a
                            href="/resume.pdf"
                            download
                            className="mb-2 py-2 text-white duration-200 font-links-light hover:text-lg flex items-center gap-2 rounded-none px-4 shadow-md transition-all w-fit"
                        >
                            
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
