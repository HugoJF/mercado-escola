import React          from "react";
import { useLocation} from "react-router-dom";
import {Menu}         from "../components/Menu";


export const Overlay: React.FC = ({children}) => {
    const location = useLocation();

    return <div className="fixed top-0 left-0 right-0 min-h-screen">
        <div className="flex-grow">
            {children}
        </div>
        <Menu/>
    </div>
};
