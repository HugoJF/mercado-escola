export interface Media {
    id: number;
    model_type: string;
    model_id: number;
    uuid: string;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    disk: string;
    conversions_disk: string;
    size: number;
    manipulations: any[];
    custom_properties: CustomProperties;
    responsive_images: ResponsiveImages;
    order_column: number;
    created_at: Date;
    updated_at: Date;
}

export interface CustomProperties {
    generated_conversions: {
        [id: string]: boolean;
    };
}

export interface ResponsiveImages {
    [id: string]: ResponsiveImage;
}

export interface ResponsiveImage {
    urls: string[];
    base64svg: string;
}
