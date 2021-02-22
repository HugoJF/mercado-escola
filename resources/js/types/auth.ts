import {UserProperties} from "./users";

export type AuthState = {
    me?: UserProperties;
    failed?: boolean;
};

export type LoginCredentials = {
    email: string;
    password: string;
}

export type RegisterCredentials = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
