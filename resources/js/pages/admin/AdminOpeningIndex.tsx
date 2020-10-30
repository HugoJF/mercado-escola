import React, {useState} from "react";
import {DateTimePicker}  from "@material-ui/pickers";
import {Input}           from "../../components/form/Input";
import {Button}          from "../../components/ui/Button";
import {FlatButton}      from "../../components/ui/FlatButton";
import {Plus}            from "react-feather";
import {useHistory}      from "react-router";
import useRelativePath   from "../../hooks/useRelativePath";

export const AdminOpeningIndex: React.FC = () => {
    const history = useHistory();
    const relative = useRelativePath();

    return <div className="flex flex-col space-y-4 items-stretch">

        <FlatButton
            onClick={() => history.push(relative('/novo'))}
        >
            <span className="mr-4 text-lg">Adicionar abertura</span>
            <Plus/>
        </FlatButton>
    </div>
};
