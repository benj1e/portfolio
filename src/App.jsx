import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Home from "./components/Home";
import MyCareer from "./components/MyCareer";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { Outlet } from "react-router";

const App = () => {
    const [selectedPage, setSelectedPage] = useState("Home");

    return (
        <div className="h-screen w-full flex flex-col bg-[#000] text-white font-body overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-auto p-4">
                    <Home />
                    <Skills />
                    <Projects />
                    <MyCareer />
                    <Contact />
                </div>
            </div>
        </div>
    );
};

export default App;
