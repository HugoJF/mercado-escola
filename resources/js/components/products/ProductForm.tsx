import React, {useEffect, useState}     from "react";
import {useForm}                        from "react-hook-form";
import * as QuantityConfig              from "../../configs/ProductQuantityConfig";
import {ProductProperties, ProductType} from "../../types/products";
import {Input}                          from "../form/Input";
import {Textarea}                       from "../form/Textarea";
import {Select}                         from "../form/Select";
import {Button}                         from "../ui/Button";
import {useDropzone}                    from "react-dropzone";
import {FieldWrapper}                   from "../form/FieldWrapper";
import useConfirmMenu                   from "../../hooks/useConfirmMenu";
import {QuantityTypes, rawTypeText}     from "../ui/QuantityTypeText";
import {useProductDestroyMedia}         from "../../mutations/useProductDestroyMedia";

export type ProductFormProps = {
    product?: ProductType;
    onSubmit: (data: FormData) => void;
    action: string;
}

type FileWithPreview = { file: File, preview: string };

export const ProductForm: React.FC<ProductFormProps>
    = ({onSubmit, product, action}) => {
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, errors, setError, setValue} = useForm<ProductProperties>();
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
    }, [setValue, product]);

    function setErrors(errors: object) {
        for (let [key, messages] of Object.entries(errors)) {
            // @ts-ignore
            setError(key, {type: 'manual', message: messages[0]});
        }
    }

    async function submit(data: ProductProperties) {
        setLoading(true);
        try {
            const form = new FormData();

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
        setLoading(false);
    }

    async function removeExistingImage(id: number) {
        if (!product) {
            return;
        }

        const remove = await confirm({title: 'Deseja remover essa imagem?', action: 'Remover'});

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

    // @ts-ignore
    return <form onSubmit={handleSubmit(submit)}>
        {menu}
        <div>
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
                    }}/>
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
            <div className="mb-8">
                <Select
                    name="quantity_type"
                    label="Tipo da quantidade"
                    error={errors.quantity_type}
                    selectProps={{
                        ref: register({required: 'Selecione qual o tipo de unidade do produto'})
                    }}
                >
                    {Object.keys(QuantityConfig).map(
                        (type) => (
                            <option key={type} value={type}>
                                {rawTypeText({type: type as QuantityTypes})}
                            </option>
                        )
                    )}
                </Select>
            </div>

            {/* Quantity cost */}
            <div className="mb-8">
                <Input
                    name="quantity_cost"
                    label="Preço da quantidade (em centavos)"
                    error={errors.quantity_cost}
                    inputProps={{
                        ref: register({required: 'Digite o preço (em R$) de 1 unidade do produto'}),
                        type: 'number',
                        min: 0,
                        step: 1,
                    }}
                />
            </div>

            <Button loading={loading}>
                {action}
            </Button>
        </div>
    </form>
};
