export type Timestamps = {
    updated_at: string;
    created_at: string;
}

export type SoftDeletes = {
    deleted_at: string;
}

export type Errors<T> = {
    [key in keyof T]: string[];
}

export type ResourceResponse<T> = {
    data: T;
}

export type Pivot<T> = {
    pivot: T;
}

export type PaginatedResourceResponse<T> = ResourceResponse<T> & {
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    },
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    }
}
