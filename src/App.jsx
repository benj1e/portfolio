import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Home from "./components/Home";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Connect from "./components/Connect";
import { Outlet } from "react-router";

const App = () => {
    const [selectedPage, setSelectedPage] = useState("Home");

    return (
        <div className="colorful-background h-screen w-full flex flex-col bg-[#000] text-white font-body overflow-hidden pt-10">
            <Header />
            <div className="orb-2"></div>
            <div className="flex flex-1 overflow-hidden ">
                <div className="flex-1 overflow-auto p-4">
                    <Home />
                    <Skills />
                    <Projects />
                    <Experience />
                    <Connect />
                </div>
            </div>
        </div>
    );
};

export default App;
