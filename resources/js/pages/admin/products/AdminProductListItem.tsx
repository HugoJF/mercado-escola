import {HeightTransitioner} from "../../../components/ui/HeightTransitioner";
import {ShoppingBag, Trash} from "react-feather";
import {PriceFormatter} from "../../../components/ui/PriceFormatter";
import {Link} from "react-router-dom";
import React from "react";
import {ProductType} from "../../../types/products";
import useRelativePath from "../../../hooks/useRelativePath";
import {RotatingArrowRight} from "../../../components/ui/RotatingArrowRight";
import {ProductCost} from "../../../components/products/helpers/ProductCost";

export type AdminProductListItemProps = {
    product: ProductType;
    expanded: boolean;
    onClick?: (product: ProductType) => void;
    onDelete?: (product: ProductType) => void;
}

export const AdminProductListItem: React.FC<AdminProductListItemProps>
    = ({product, expanded = false, onClick, onDelete}) => {
    const relative = useRelativePath();

    function handleClick() {
        if (onClick) {
            onClick(product)
        }
    }

    function handleDelete() {
        if (onDelete) {
            onDelete(product)
        }
    }

    return <div
        className="transition-colors duration-150 w-full py-3 border-gray-200"
    >
        <HeightTransitioner>
            {/* Product details */}
            <div
                onClick={handleClick}
                className="flex items-center"
            >
                <div className="flex items-center justify-center w-6 mr-4">
                    <ShoppingBag className="text-primary-500"/>
                </div>

                <div className="flex-grow">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <div className="mt-1">
                        {/* Stats */}
                        <ul className="flex space-x-2 text-sm text-gray-500 tracking-tight">
                            {/* Product price */}
                            <li className="text-center">
                                <ProductCost product={product}>
                                    {({text, cost}) => <>
                                        <PriceFormatter cents price={cost}/>
                                        /
                                        {text}
                                    </>}
                                </ProductCost>
                            </li>

                            {/* Separator */}
                            <span className="font-bold text-gray-300">·</span>

                            {/* Product quantity */}
                            <li className="text-center">
                                {Object.values(product.media_links).length} imagens
                            </li>
                        </ul>
                    </div>
                </div>

                <RotatingArrowRight rotated={expanded}/>
            </div>

            {/* Reveal menu */}
            <div className="mt-4">
                {expanded && <div className="grid grid-cols-3 divide-x divide-gray-200">
                    {/* View */}
                    <Link
                        to={`/produtos/${product.id}`}
                        className="flex justify-center items-center py-2 px-5 text-gray-700 font-medium cursor-pointer"
                    >
                        Ver
                    </Link>

                    {/* Delete */}
                    <div
                        onClick={handleDelete}
                        className="flex justify-center items-center py-2 px-4 text-red-600 font-medium cursor-pointer"
                    >
                        <Trash size={20} className="mr-1 flex-shrink-0 inline"/>
                        Deletar
                    </div>

                    {/* Edit */}
                    <Link
                        to={relative(`/${product.id}/editar`)}
                        className="flex justify-center items-center py-2 px-5 text-gray-700 font-medium cursor-pointer"
                    >
                        Editar
                    </Link>
                </div>}
            </div>
        </HeightTransitioner>
    </div>
};
