export type Timestamps = {
    updated_at: string;
    created_at: string;
}

export type SoftDeletes = {
    deleted_at: string;
}

export type ResourceResponse<T> = {
    data: T;
}

export type Pivot<T> = {
    pivot: T;
}

export type Media = {
    id: number;
    model_type: string;
    model_id: number;
    uuid: string;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    disk: string;
    conversion_disk: string;
    size: number;
    manipulations: any[];
    custom_properties: any[];
    responsive_images: any[];
    order_column: number;
    created_at: string;
    updated_at: string;
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
