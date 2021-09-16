import React from "react";
import {FileWithPreview} from "@type/forms";
import {FieldWrapper} from "@components/form/FieldWrapper";
import {ProductType} from "@type/products";

type Props = {
    product: ProductType;
    rootProps: React.HTMLAttributes<HTMLDivElement>
    inputProps: React.HTMLAttributes<HTMLInputElement>
    onRemoveImage: (id: Id) => void;
    uploads: FileWithPreview[];
    onRemoveUpload: (upload: FileWithPreview) => void;
}

export const ProductImages: React.FC<Props> = ({
                                                   product,
                                                   rootProps,
                                                   inputProps,
                                                   onRemoveImage,
                                                   uploads,
                                                   onRemoveUpload
                                               }) => {

    async function handleRemoveImage(id: Id) {
        await onRemoveImage(id)
    }

    async function handleOnRemoveUpload(upload: FileWithPreview) {
        await onRemoveUpload(upload);
    }

    return <FieldWrapper label="Imagens" name="images">
        <ul className="grid grid-cols-4 gap-4 mb-4 pt-2">
            {Object.entries(product.media_links).map(([id, url]) =>
                <li
                    key={url}
                    className="relative flex items-center justify-center rounded-lg shadow"
                >
                    <img
                        className="rounded-lg"
                        onClick={() => handleRemoveImage(id)}
                        src={url}
                        alt={product?.name}
                    />
                </li>
            )}

            {uploads.map(upload =>
                <li
                    key={upload.file.name}
                    className="relative flex items-center justify-center p-1
                                bg-gray-200 border border-gray-300 shadow-inner rounded-lg"
                >
                    <div
                        className="transform translate-x-1/2 -translate-y-1/2 absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-bounce"/>
                    <img
                        onClick={() => handleOnRemoveUpload(upload)}
                        key={upload.file.name}
                        src={upload.preview}
                        alt={upload.file.name}
                    />
                </li>)}
        </ul>

        <div
            {...rootProps}
            className="flex items-center justify-center
                        mb-8 px-8 py-8 bg-gray-200 text-gray-400
                        text-center border-2 border-dashed border-gray-400
                        focus:border-primary-500 h-32 rounded-lg"
        >
            <input
                name="images"
                {...inputProps}
            />
            <p>Arraste fotos do produto aqui ou clique para selecioná-los</p>
        </div>
    </FieldWrapper>
};
