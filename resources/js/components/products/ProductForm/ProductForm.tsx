import React, {useState} from "react";
import {ProductProperties, ProductType} from "@type/products";
import {Button} from "../../ui/Button";
import {FieldWrapper} from "../../form/FieldWrapper";
import useConfirmMenu from "@hooks/useConfirmMenu";
import {ProductFormUnit} from "./ProductFormUnit";
import {ProductFormWeight} from "./ProductFormWeight";
import isEmpty from "lodash.isempty";
import {ProductName} from "~/forms/fields/ProductName";
import {ProductDescription} from "~/forms/fields/ProductDescription";
import useImageDropzone from "@hooks/useImageDropzone";
import {ProductImages} from "~/forms/fields/ProductImages";
import {QuantityType} from "~/forms/fields/QuantityType";
import {FileWithPreview} from "@type/forms";
import useFormy from "@hooks/useMyFormy";

export type ProductFormProps = {
    product?: ProductType;
    onSubmit: (data: ProductProperties, files: FileWithPreview[]) => Promise<void>;
    onRemoveMedia: (request: { productId: number, mediaId: number }) => void;
    action: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({onSubmit, onRemoveMedia, product, action}) => {
    const [loading, setLoading] = useState(false);
    const [menu, confirm] = useConfirmMenu();

    const {
        form: {
            handleSubmit,
            formState: {errors},
            watch,
            control
        },
        setErrors,
    } = useFormy<ProductProperties>({
        defaultValues: product,
        mode: "onChange",
    }, product);

    const {
        uploadingFiles,
        removeFile,
        dropzone: {getInputProps, getRootProps}
    } = useImageDropzone();

    async function submit(data: ProductProperties) {
        setLoading(true);
        try {
            await onSubmit(data, uploadingFiles);
        } catch (e) {
            setErrors(e);
        }
        setLoading(false);
    }

    async function removeExistingImage(id: number) {
        if (!product) {
            return;
        }

        const remove = await confirm({
            title: 'Deseja remover essa imagem?',
            action: 'Remover',
        });

        if (remove) {
            onRemoveMedia({
                productId: product.id,
                mediaId: id,
            })
        }
    }

    return <form onSubmit={handleSubmit(submit)}>
        {menu}

        {/* Images */}
        <ProductImages
            product={product}
            inputProps={getInputProps()}
            rootProps={getRootProps()}
            uploads={uploadingFiles}
            onRemoveImage={id => removeExistingImage(parseInt(id.toString()))}
            onRemoveUpload={upload => removeFile(upload)}
        />

        {/* Title */}
        <div className="mb-8">
            <ProductName name="name" control={control}/>
        </div>

        {/* Description */}
        <div className="mb-8">
            <ProductDescription name="description" control={control}/>
        </div>

        {/* Quantity type */}
        <FieldWrapper
            name="type"
            label="Como o produto é vendido?"
            error={errors.type}
        >
            <QuantityType name="type" control={control}/>
        </FieldWrapper>

        {watch('type') === 'unit' && <ProductFormUnit
            control={control}
        />}

        {watch('type') === 'weight' && <ProductFormWeight
            control={control}
        />}

        <Button enabled={isEmpty(errors)} className="w-full" loading={loading}>
            {action}
        </Button>
    </form>
};
