import React from "react";
import Details from "./Details";
import Info from "./Info";


const Home = () => {
    return <div className="flex w-full h-screen justify-between text-white items-start bg-gray-950">
        <Info />
        <Details />
    </div>;
};

export default Home;
