export type Timestamps = {
    updated_at: string;
    created_at: string;
}

export type SoftDeletes = {
    deleted_at: string;
}

export type ResourceResponse<T> = {
    data: T
}
