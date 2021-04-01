import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";
import {UserProperties} from "../types/users";

type Params = {
    id: Id;
    data: Partial<UserProperties>;
}

export function useUserUpdate() {
    const queryClient = useQueryClient();

    return useMutation(
        (params: Params) => api.users.update(params.id, params.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    );
}
