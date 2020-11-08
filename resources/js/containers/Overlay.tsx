import React          from "react";
import {HeaderRoutes} from "../routes/HeaderRoutes";
import {MenuRoutes}   from "../routes/MenuRoutes";


export const Overlay: React.FC = ({children}) => {
    return <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col min-h-screen max-h-screen">
        {/* Header */}
        <HeaderRoutes/>

        {/* Content */}
        <main className="relative flex-grow overflow-hidden">
            {children}
        </main>

        {/* Bottom */}
        <MenuRoutes/>
    </div>
};
