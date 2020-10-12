import React          from "react";
import { useLocation} from "react-router-dom";
import {Menu}         from "../components/Menu";


export const Overlay: React.FC = ({children}) => {
    const location = useLocation();

    return <>
        <div className="flex-grow">
            {children}
        </div>
        <Menu/>
    </>
};
