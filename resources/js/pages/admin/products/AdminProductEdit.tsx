import React from "react";
import {Title} from "@components/ui/Title";
import {PagePadding} from "@containers/PagePadding";
import {ProductType} from "@type/products";
import {ProductFormContainer} from "@components/products/ProductFormContainer";

export type AdminProductEditProps = {
    product: ProductType;
    onSubmit: (data: FormData) => void;
}

export const AdminProductEdit: React.FC<AdminProductEditProps> = ({product, onSubmit}) => {
    return <PagePadding>
        <Title>Atualizando {product?.name}</Title>

        <ProductFormContainer
            product={product}
            onSubmit={onSubmit}
            action="Atualizar"
        />
    </PagePadding>
};
