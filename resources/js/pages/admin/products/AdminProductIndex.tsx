import React from "react";
import {Plus} from "react-feather";
import {FlatButton} from "../../../components/ui/FlatButton";
import {ProductType} from "../../../types/products";
import useNavigation from "../../../hooks/useNavigation";
import {AdminProductList} from "./AdminProductList";
import {Empty} from "../../../components/ui/Empty";
import {Title} from "../../../components/ui/Title";
import {PagePadding} from "../../../containers/PagePadding";
import isEmpty from "lodash.isempty";

export type AdminProductIndexProps = {
    products: ProductType[];
    expanded?: number;
    onClick?: (product: ProductType) => void;
    onDelete?: (product: ProductType) => void;
}

export const AdminProductIndex: React.FC<AdminProductIndexProps>
    = ({products, expanded, onClick, onDelete}) => {
    const {bindGo} = useNavigation();

    return <PagePadding className="space-y-4">
        <Title>Lista de produtos</Title>

        {isEmpty(products) && <Empty
            title="Nenhum produto!"
            description="Nenhum produto foi registrado no sistema"
        />}

        <AdminProductList
            products={products}
            expanded={expanded}
            onClick={onClick}
            onDelete={onDelete}
        />

        <FlatButton
            onClick={bindGo('./novo')}
            text="Adicionar produto"
            icon={Plus}
        />
    </PagePadding>
};
