import React from "react";
import { IoMdSettings } from "react-icons/io";

const SideAssets = () => {
    return (
        <header className="flex items-center justify-between px-6 p-6">
            <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                    <IoMdSettings size={20} />
                </div>
                <h1 className="font-header flex-1 text-xl font-semibold m-0">
                    Portfolio FC
                </h1>
            </div>
            <div className="font-main whitespace-nowrap">
                Benjamin Omoroje Alimele
            </div>
        </header>
    );
};

export default SideAssets;
