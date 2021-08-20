import React from "react";
import {Title} from "@components/ui/Title";
import {ProductForm} from "@components/products/ProductForm/ProductForm";
import {PagePadding} from "@containers/PagePadding";
import {ProductType} from "@type/products";

export type AdminProductEditProps = {
    product: ProductType;
    onSubmit: (data: FormData) => void;
}

export const AdminProductEdit: React.FC<AdminProductEditProps> = ({product, onSubmit}) => {
    return <PagePadding>
        <Title>Atualizando {product?.name}</Title>

        <ProductForm
            product={product}
            onSubmit={onSubmit}
            action="Atualizar"
        />
    </PagePadding>
};
