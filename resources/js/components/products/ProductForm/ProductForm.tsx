import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {ProductProperties, ProductType} from "../../../types/products";
import {Input} from "../../form/Input";
import {Textarea} from "../../form/Textarea";
import {Button} from "../../ui/Button";
import {useDropzone} from "react-dropzone";
import {FieldWrapper} from "../../form/FieldWrapper";
import useConfirmMenu from "../../../hooks/useConfirmMenu";
import {useProductDestroyMedia} from "../../../mutations/useProductDestroyMedia";
import useLoading from "../../../hooks/useLoading";
import {ProductFormUnit} from "./ProductFormUnit";
import {ProductFormWeight} from "./ProductFormWeight";

export type ProductFormProps = {
    product?: ProductType;
    onSubmit: (data: FormData) => void;
    action: string;
}

type FileWithPreview = { file: File, preview: string };

export const ProductForm: React.FC<ProductFormProps>
    = ({onSubmit, product, action}) => {
    const {loading, load} = useLoading();
    const {register, handleSubmit, errors, setError, setValue, watch} = useForm<ProductProperties>();
    const [menu, confirm] = useConfirmMenu();
    const [uploadingFiles, setUploadingFiles] = useState<FileWithPreview[]>([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            const filesWithPreview = acceptedFiles.map(file => ({
                file: file,
                preview: URL.createObjectURL(file)
            }));
            setUploadingFiles([...uploadingFiles, ...filesWithPreview]);
        }
    });
    // TODO: move to container
    const productDestroyMedia = useProductDestroyMedia();

    useEffect(() => {
        if (!product) {
            return;
        }

        for (let prop of Object.keys(product)) {
            // @ts-ignore
            setValue(prop, product[prop]);
        }

        // Custom setter to convert cents to BRL
        setValue('quantity_cost', product.quantity_cost / 100);
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

                // Deal with API price format being cents
                data.quantity_cost = data.quantity_cost * 100;

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

    function removeFile(remove: FileWithPreview) {
        const removedFiles: FileWithPreview[] = [];
        const filteredFiles: FileWithPreview[] = [];

        uploadingFiles.forEach(file => {
            if (file.file.name === remove.file.name) {
                removedFiles.push(file);
            } else {
                filteredFiles.push(file);
            }
        });

        for (const file of removedFiles) {
            URL.revokeObjectURL(file.preview);
        }

        setUploadingFiles(filteredFiles);
    }

    return <form onSubmit={handleSubmit(submit)}>
        {menu}
        {/* Images */}
        <FieldWrapper label="Imagens" name="images">
            <ul className="grid grid-cols-4 gap-4 mb-4 pt-2">
                {Object.entries(product?.media_links ?? {}).map(([id, url]) =>
                    <li
                        key={url}
                        className="relative flex items-center justify-center
                                border-4 border-gray-300 rounded-lg"
                    >
                        <img
                            className="rounded"
                            onClick={() => removeExistingImage(parseInt(id))}
                            src={url}
                            alt={product?.name}
                        />
                    </li>
                )}

                {uploadingFiles.map(file =>
                    <li
                        key={file.file.name}
                        className="relative flex items-center justify-center p-1
                                bg-gray-200 border border-gray-300 shadow-inner rounded-lg"
                    >
                        <div className="transform translate-x-1/2 -translate-y-1/2 absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-bounce"/>
                        <img
                            onClick={() => removeFile(file)}
                            key={file.file.name}
                            src={file.preview}
                            alt={file.file.name}
                        />
                    </li>)}
            </ul>

            <div
                {...getRootProps()}
                className="flex items-center justify-center
                        mb-8 px-8 py-8 bg-gray-200 text-gray-400
                        text-center border-2 border-dashed border-gray-400
                        focus:border-primary-500 h-32 rounded-lg"
            >
                <input
                    name="images"
                    {...getInputProps()}
                />
                <p>Arraste fotos do produto aqui ou clique para selecioná-los</p>
            </div>
        </FieldWrapper>

        {/* Title */}
        <div className="mb-8">
            <Input
                name="name"
                label="Nome"
                error={errors.name}
                inputProps={{
                    ref: register({required: 'Digite o nome do produto'}),
                    placeholder: "Digite o nome do produto...",
                }}
            />
        </div>

        {/* Description */}
        <div className="mb-8">
            <Textarea
                name="description"
                label="Descrição"
                error={errors.description}
                textAreaProps={{
                    ref: register({required: 'Digite a descrição do produto'}),
                }}
            />
        </div>

        {/* Quantity type */}
        <FieldWrapper
            name="quantity_type"
            label="Como o produto é vendido?"
            error={errors.quantity_type}
        >
            <div className="grid grid-cols-2 mb-8">
                <div>
                    <input
                        className="appearance-none peer sr-only"
                        id="quantity_type-unit"
                        name="quantity_type"
                        type="radio"
                        value="unit"
                        ref={register}
                    />
                    <label
                        className="duration-150 block py-4
                        peer-checked:bg-blue-500 peer-checked:text-white
                        text-lg text-center font-medium hover:bg-gray-200
                        border border-r-0 rounded-l-lg cursor-pointer"
                        htmlFor="quantity_type-unit"
                    >
                        Por unidade
                    </label>
                </div>
                <div>
                    <input
                        className="appearance-none peer sr-only"
                        id="quantity_type-weight"
                        name="quantity_type"
                        type="radio"
                        value="weight"
                        ref={register}
                    />
                    <label
                        className="duration-150 block py-4
                        peer-checked:bg-blue-500 peer-checked:text-white
                        text-lg text-center font-medium hover:bg-gray-200
                        border border-l-0 rounded-r-lg cursor-pointer"
                        htmlFor="quantity_type-weight"
                    >
                        Por peso
                    </label>
                </div>
            </div>
        </FieldWrapper>

        {watch('quantity_type2') === 'unit' && <ProductFormUnit
            error={errors.quantity_type}
            register={register}
        />}

        {watch('quantity_type2') === 'weight' && <ProductFormWeight
            error={errors.quantity_type}
            register={register}
        />}

        <Button className="w-full" loading={loading}>
            {action}
        </Button>
    </form>
};
