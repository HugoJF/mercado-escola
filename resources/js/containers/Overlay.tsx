import React          from "react";
import {HeaderRoutes} from "../routes/HeaderRoutes";
import {MenuRoutes}   from "../routes/MenuRoutes";


export const Overlay: React.FC = ({children}) => {
    return <div className="fixed w-full h-screen flex flex-col">
        {/* Header */}
        <HeaderRoutes/>

        {/* Content */}
        <main className="relative flex-grow overflow-hidden">
            <div className="absolute w-full h-full">
                {children}
            </div>
        </main>

        {/* Bottom */}
        <MenuRoutes/>
    </div>
};
