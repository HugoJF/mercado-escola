import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {ProductProperties, ProductType} from "@type/products";
import {Button} from "../../ui/Button";
import {FieldWrapper} from "../../form/FieldWrapper";
import useConfirmMenu from "@hooks/useConfirmMenu";
import {useProductDestroyMedia} from "~/mutations/useProductDestroyMedia";
import useLoading from "@hooks/useLoading";
import {ProductFormUnit} from "./ProductFormUnit";
import {ProductFormWeight} from "./ProductFormWeight";
import isEmpty from "lodash.isempty";
import {ProductName} from "~/forms/fields/ProductName";
import {ProductDescription} from "~/forms/fields/ProductDescription";
import useImageDropzone from "@hooks/useImageDropzone";
import {ProductImages} from "~/forms/fields/ProductImages";
import {QuantityType} from "~/forms/fields/QuantityType";

export type ProductFormProps = {
    product?: ProductType;
    onSubmit: (data: FormData) => void;
    action: string;
}

export const ProductForm: React.FC<ProductFormProps>
    = ({onSubmit, product, action}) => {
    const {loading, load} = useLoading();
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        setValue,
        watch,
        control
    } = useForm<ProductProperties>(
        {
            defaultValues: product,
            mode: "onChange",
        }
    );
    const [menu, confirm] = useConfirmMenu();
    const {
        uploadingFiles,
        removeFile,
        dropzone: {getInputProps, getRootProps}
    } = useImageDropzone();

    // TODO: move to container
    const productDestroyMedia = useProductDestroyMedia();

    // TODO: this should be removed once ProductForm get's a container.
    // defaultValues for useForm() should be used instead
    useEffect(() => {
        if (!product) {
            return;
        }

        for (let prop of Object.keys(product)) {
            // @ts-ignore
            setValue(prop, product[prop]);
        }
    }, [setValue, product]);

    function setErrors(errors: object) {
        for (let [key, messages] of Object.entries(errors)) {
            // @ts-ignore
            setError(key, {type: 'manual', message: messages[0]});
        }
    }

    async function submit(data: ProductProperties) {
        load(async () => {
            try {
                const form = new FormData;

                for (const [key, value] of Object.entries(data)) {
                    form.append(key, String(value));
                }

                uploadingFiles.forEach((value) => {
                    form.append('images[]', value.file);
                });

                await onSubmit(form);
            } catch (e) {
                // TODO: type check this
                setErrors(e.errors);
                throw e;
            }
        });
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
            productDestroyMedia.mutate({
                productId: product.id,
                mediaId: id,
            })
        }
    }

    return <form onSubmit={handleSubmit(submit)}>
        {menu}

        {/* Images */}
        {product && <ProductImages
            product={product}
            inputProps={getInputProps()}
            rootProps={getRootProps()}
            uploads={uploadingFiles}
            onRemoveImage={id => removeExistingImage(parseInt(id.toString()))}
            onRemoveUpload={upload => removeFile(upload)}
        />}

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
