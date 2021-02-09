import React                  from "react";
import {Plus}                 from "react-feather";
import {FlatButton}           from "../../../components/ui/FlatButton";
import {ProductType}          from "../../../models/products";
import {AdminProductListItem} from "./AdminProductListItem";
import useNavigation          from "../../../hooks/useNavigation";

export type AdminProductIndexProps = {
    products: ProductType[];
    expanded?: number;
    onClick?: (product: ProductType) => void;
    onDelete?: (product: ProductType) => void;
}

export const AdminProductIndex: React.FC<AdminProductIndexProps>
    = ({products, expanded, onClick, onDelete}) => {
    const {bindGo} = useNavigation();

    return <>
        <div className="divide-y divide-gray-200">
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
            onClick={bindGo('/novo')}
        >
            <span className="mr-4 text-lg">Adicionar produto</span>
            <Plus/>
        </FlatButton>
    </>
};
