import React from 'react';
import {useDispatch} from "react-redux";
import {Dispatch} from "../../store";
import clsx from 'clsx';
import useTimeout from 'use-timeout'
import {ToastType, ToastTypes} from "../../types/toasts";

export type ToastProps = {
    id: string;
    toast: ToastType;
}

export const Toast: React.FC<ToastProps> = ({id, toast}) => {
    const dispatch = useDispatch<Dispatch>();

    useTimeout(remove, toast.duration);

    function remove() {
        dispatch.toasts.remove(id);
    }

    return <div
        onClick={remove}
        className="duration-150 flex items-center justify-center space-x-6 px-6 py-3 mt-8
            bg-white shadow-lg hover:shadow-xl cursor-pointer rounded-lg"
    >
        {/* Little exclamation */}
        <div
            className={clsx(
                'flex flex-shrink-0 items-center justify-center w-8 h-8',
                'text-xl text-white font-bold rounded-full', {
                    'bg-green-500': toast.type === ToastTypes.SUCCESS,
                    'bg-red-500': toast.type === ToastTypes.ERROR,
                    'bg-yellow-500': toast.type === ToastTypes.WARNING,
                })}
        >
            !
        </div>

        {/* Content */}
        <div className="space-y-2">
            <h2 className="font-bold">{toast.title}</h2>
            <p className="text-sm text-gray-700">{toast.description}</p>
        </div>
    </div>
};
