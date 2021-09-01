import {ConfirmActionMenu} from "@menus/ConfirmActionMenu";
import React, {ReactNode, useRef, useState} from "react";

export type ConfirmMenuParams = {
    title: string | ReactNode;
    description?: string | ReactNode;
    action?: string | ReactNode;
}

export default function useConfirmMenu(): [ReactNode, (params: ConfirmMenuParams) => Promise<boolean>] {
    const [open, setOpen] = useState(false);
    const promise = useRef<(confirmed: boolean) => void>();
    const [title, setTitle] = useState<string | ReactNode>('');
    const [description, setDescription] = useState<string | ReactNode | undefined>('');
    const [action, setAction] = useState<string | ReactNode>();

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
