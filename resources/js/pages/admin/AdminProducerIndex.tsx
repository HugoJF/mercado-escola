import React            from "react";
import {WorkInProgress} from "../../components/ui/WorkInProgress";

export const AdminProducerIndex: React.FC = () => {
    return <div className="py-4 space-y-16 flex flex-col min-h-full">
        {/* Header */}
        <div className="text-center space-y-4">
            <h1 className="text-2xl text-gray-700 font-bold">Em desenvolvimento!</h1>
            <h2 className="text-gray-400">O conteúdo dessa página ainda não está pronto, tente novamente mais tarde.</h2>
        </div>

        {/* Illustration */}
        <div className="mx-auto flex flex-shrink-0 items-center justify-center h-64 w-64">
            <WorkInProgress/>
        </div>
    </div>
};
