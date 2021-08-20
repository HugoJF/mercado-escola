import {SoftDeletes, Timestamps} from "~/types";

export type UserType = UserProperties & UserComputedProperties & Timestamps & SoftDeletes;

export type UserProperties = {
    name: string,
    phone: string | null,
    email: string,
    admin: boolean,
}

export type UserComputedProperties = {
    id: number;
}
