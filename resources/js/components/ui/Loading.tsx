import React    from "react";
import {Loader} from "react-feather";

export const Loading: React.FC<{ loading: boolean }> = ({children, loading}) => {
    if (loading) {
        return <div className="w-full flex justify-center">
            <Loader size={48} className="animate-spin"/>
        </div>
    } else {
        return <>{children}</>;
    }
};
