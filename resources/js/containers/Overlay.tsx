import React  from "react";
import {Menu} from "../components/Menu";


export const Overlay: React.FC = ({children}) => {
    return <div className="fixed top-0 left-0 right-0 min-h-screen">
        <div className="flex-grow">
            {children}
        </div>
        <Menu/>
    </div>
};
