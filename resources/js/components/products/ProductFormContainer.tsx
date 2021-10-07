import React from "react";
import {ProductProperties, ProductType} from "@type/products";
import {ProductForm} from "@components/products/ProductForm/ProductForm";
import {useProductDestroyMedia} from "@mutations/useProductDestroyMedia";
import {FileWithPreview} from "@type/forms";

export type ProductFormContainerProps = {
    product?: ProductType;
    onSubmit: (data: FormData) => void;
    action: string;
}

export const ProductFormContainer: React.FC<ProductFormContainerProps> = ({product, onSubmit, action}) => {
    const productDestroyMedia = useProductDestroyMedia();


    function handleOnRemoveMedia(data: { productId: number, mediaId: number }) {
        productDestroyMedia.mutate(data)
    }

    async function handleOnSubmit(data: ProductProperties, files: FileWithPreview[]) {
        const form = new FormData;

        for (const [key, value] of Object.entries(data)) {
            form.append(key, String(value));
        }

        files.forEach(file => {
            form.append('images[]', file.file);
        });

        await onSubmit(form);
    }

    return <ProductForm
        onRemoveMedia={handleOnRemoveMedia}
        onSubmit={handleOnSubmit}
        product={product}
        action={action}
    />
};
