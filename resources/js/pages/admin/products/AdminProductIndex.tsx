import React                  from "react";
import {Title}                from "../../../components/ui/Title";
import {Plus}                 from "react-feather";
import {useHistory}           from "react-router-dom";
import {FlatButton}           from "../../../components/ui/FlatButton";
import {PagePadding}          from "../../../containers/PagePadding";
import {ProductType}          from "../../../models/products";
import useRelativePath        from "../../../hooks/useRelativePath";
import {AdminProductListItem} from "./AdminProductListItem";

export type AdminProductIndexProps = {
    products: ProductType[];
    expanded?: number;
    onClick?: (product: ProductType) => void;
    onDelete?: (product: ProductType) => void;
}

export const AdminProductIndex: React.FC<AdminProductIndexProps>
    = ({products, expanded, onClick, onDelete}) => {
    const relative = useRelativePath();
    const history = useHistory();

    return <PagePadding>
        <Title>Lista de produtos</Title>

        <div className="my-4 divide-y divide-gray-200">
            {products.map(product => (
                <AdminProductListItem
                    product={product}
                    expanded={product && expanded === product?.id}
                    onClick={onClick}
                    onDelete={onDelete}
                />
            ))}
        </div>

        <FlatButton
            onClick={() => history.push(relative('/novo'))}
        >
            <span className="mr-4 text-lg">Adicionar produto</span>
            <Plus/>
        </FlatButton>
    </PagePadding>
};
