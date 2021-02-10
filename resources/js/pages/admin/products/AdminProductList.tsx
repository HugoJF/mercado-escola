import React                  from "react";
import {ProductType}          from "../../../models/products";
import {AdminProductListItem} from "./AdminProductListItem";

export type AdminProductListItemProps = {
    products: ProductType[];
    expanded?: number;
    onClick?: (product: ProductType) => void;
    onDelete?: (product: ProductType) => void;
}

export const AdminProductList: React.FC<AdminProductListItemProps>
    = ({products, expanded, onClick, onDelete}) => {
    return <div className="divide-y divide-gray-200">
        {products.map(product => (
            <AdminProductListItem
                key={product.id}
                product={product}
                expanded={product && expanded === product.id}
                onClick={onClick}
                onDelete={onDelete}
            />
        ))}
    </div>
};
