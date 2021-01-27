import React    from "react";
import {Loader} from "react-feather";

export type LoadingProps = {
    loading?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({children, loading = true}) => {
    if (loading) {
        return <div className="min-h-full w-full flex items-center justify-center">
            <Loader size={48} className="animate-spin"/>
        </div>
    } else {
        return <>{children}</>;
    }
};
