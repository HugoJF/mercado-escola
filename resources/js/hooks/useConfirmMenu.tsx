import {ConfirmActionMenu}       from "../action-menus/ConfirmActionMenu";
import React, {useRef, useState} from "react";

export type ConfirmMenuParams = {
    title: string;
    description?: string;
    action?: string;
}

export default function useConfirmMenu(): [React.ReactNode, (params: ConfirmMenuParams) => Promise<boolean>] {
    const [open, setOpen] = useState(false);
    const promise = useRef<(confirmed: boolean) => void>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string|undefined>('');
    const [action, setAction] = useState<string>();

    function confirm({title, description, action}: ConfirmMenuParams): Promise<boolean> {
        setTitle(title);
        setDescription(description);
        setAction(action);
        setOpen(true);

        return new Promise<boolean>((res, rej) => {
            promise.current = res;
        });
    }

    function handleOnClick(confirmed: boolean) {
        if (promise.current) {
            promise.current(confirmed);
        }
    }

    return [
        <ConfirmActionMenu
            open={open}
            action={action ?? 'Confirmar'}
            title={title}
            description={description}
            onClick={handleOnClick}
            onClose={() => setOpen(false)}
        />,
        confirm
    ]
}
