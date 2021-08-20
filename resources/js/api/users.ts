import {bxios} from "~/bxios";
import {ResourceResponse} from "~/types";
import {UserProperties, UserType} from "@type/users";

export const users = {
    index: () => bxios()
        .get('users')
        .send<ResourceResponse<UserType[]>>(),
    update: (id: Id, data: Partial<UserProperties>) => bxios()
        .patch('users', id)
        .body(data)
        .send<ResourceResponse<UserType>>(),
};
