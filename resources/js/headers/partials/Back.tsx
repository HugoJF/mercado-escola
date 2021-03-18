import React         from 'react';
import {ChevronLeft} from "react-feather";
import {useHistory}  from "react-router";

export const Back: React.FC = () => {
    const history = useHistory();

    return <div className="py-4 flex justify-between items-center px-6">
        <ChevronLeft size={24} className="cursor-pointer" onClick={history.goBack}/>
    </div>
};
