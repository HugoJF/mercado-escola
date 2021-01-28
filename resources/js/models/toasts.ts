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
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
    type: ToastTypes;
    duration: number;
}

export type ToastsState = {
    [id: string]: ToastType
}

const defaults: ToastType = {
    title: '',
    duration: 5000,
    type: ToastTypes.SUCCESS,
};

export const toasts = createModel<RootModel>()({
    state: {} as ToastsState,
    reducers: {
        add: (state, payload: Partial<ToastType>) => {
            state[uuid()] = {...defaults, ...payload};

            return state;
        },
        remove: (state, payload: string) => {
            delete state[payload];

            return state;
        }
    },
});
