import {createModel}                                      from "@rematch/core";
import {RootModel}                                        from "./index";
import React                                              from "react";
import {v4 as uuid}                                       from 'uuid';

export enum ToastTypes {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
}

export type ToastType = {
    title: string;
    description?: string | React.ReactNode;
    type?: ToastTypes;
    duration: number;
}

export type ToastsState = {
    [id: string]: ToastType
}

export const toasts = createModel<RootModel>()({
    state: {} as ToastsState,
    reducers: {
        add: (state, payload: ToastType) => {
            state[uuid()] = payload;

            return state;
        },
        remove: (state, payload: string) => {
            delete state[payload];

            return state;
        }
    },
});
