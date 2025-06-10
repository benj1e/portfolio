import React from "react";
import Home from "./widgets/Home";
import MyCareer from "./widgets/MyCareer";
import Projects from "./widgets/Projects";
import Squad from "./widgets/Squad";
import Contact from "./widgets/Contact";
import { Outlet } from "react-router";

// Individual page components (could be in separate files later)

// Main Widget
export default function Widget({ selected }) {
    const renderPage = () => {
        // switch (selected) {
        //     case "Home":
        //         return <Home />;
        //     case "My Career":
        //         return <MyCareer />;
        //     case "Projects":
        //         return <Projects />;
        //     case "Squad":
        //         return <Squad />;
        //     case "Contact":
        //         return <Contact />;
        //     default:
        //         return <div className="p-4">Page not found</div>;
        // }
        return <Outlet />;
    };

    return (
        <div className="h-full max-h-full w-full overflow-y-auto">
            {renderPage()}
        </div>
    );
}
