import React, { useState } from "react";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Widget from "./components/Widget";

const App = () => {
    const [selectedPage, setSelectedPage] = useState("Home");

    return (
        <div className="h-screen w-full flex flex-col bg-[#1e1e1e] bg-gradient-to-b from-[#1e1e1e]/60 to-[#0a0a0a]/90 text-white font-body overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Menu selected={selectedPage} onSelect={setSelectedPage} />
                <div className="flex-1 overflow-auto p-4">
                    <Widget selected={selectedPage} />
                </div>
            </div>
        </div>
    );
};

export default App;
