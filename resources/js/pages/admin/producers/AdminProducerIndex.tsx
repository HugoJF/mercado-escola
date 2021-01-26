import React            from "react";
import {WorkInProgress} from "../../../components/ui/WorkInProgress";
import {PagePadding}    from "../../../containers/PagePadding";

export const AdminProducerIndex: React.FC = () => {
    return <PagePadding className="h-full flex flex-col items-center justify-center">
        <div className="space-y-8">
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
    </PagePadding>
};
