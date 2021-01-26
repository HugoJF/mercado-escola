import {HeightTransitioner}   from "../../../components/ui/HeightTransitioner";
import {ShoppingBag, Trash}   from "react-feather";
import {Skeleton}             from "../../../components/ui/Skeleton";
import {PriceFormatter}       from "../../../components/ui/PriceFormatter";
import {QuantityTypeText}     from "../../../components/ui/QuantityTypeText";
import {Link}                 from "react-router-dom";
import React                  from "react";
import {ProductType}          from "../../../models/products";
import useRelativePath        from "../../../hooks/useRelativePath";
import {RotatingArrowRight} from "../../../components/ui/RotatingArrowRight";

export type AdminProductListItemProps = {
    product: ProductType;
    expanded: boolean;
    onClick?: (product: ProductType) => void;
    onDelete?: (product: ProductType) => void;
}

export const AdminProductListItem: React.FC<AdminProductListItemProps>
    = ({product, expanded = false, onClick, onDelete}) => {
    const relative = useRelativePath();

    return <div
        key={product.id}
        className="transition-colors duration-150 w-full py-3 border-gray-200"
    >
        <HeightTransitioner>
            {/* Product details */}
            <div
                onClick={() => product && onClick && onClick(product)}
                className="flex items-center"
            >
                <div className="flex items-center justify-center w-6 mr-4">
                    <ShoppingBag className="text-primary-500"/>
                </div>

                <div className="flex-grow">
                    <h3 className="text-lg font-medium">{product.name || <Skeleton className="w-3/4"/>}</h3>
                    <div className="mt-1">
                        {/* Stats */}
                        <ul className="flex space-x-2 text-sm text-gray-500 tracking-tight">
                            {/* Product price */}
                            <li className="text-center">
                                {product?.quantity_cost ?
                                    <>
                                        <PriceFormatter cents price={product.quantity_cost}/>
                                        /
                                        <QuantityTypeText type={product?.quantity_type}/>
                                    </>
                                    :
                                    <Skeleton className="w-20"/>
                                }
                            </li>

                            {/* Separator */}
                            <span className="font-bold text-gray-300">·</span>

                            {/* Product quantity */}
                            <li className="text-center">
                                {product?.media ? `${Object.values(product.media).length} imagens` : <Skeleton className="w-20"/>}
                            </li>
                        </ul>
                    </div>
                </div>

                {product && <RotatingArrowRight rotated={expanded}/>}
            </div>

            {/* Reveal menu */}
            <div className="mt-4">
                {expanded && <div className="grid grid-cols-3 divide-x divide-gray-200">
                    {/* View */}
                    <Link
                        to={`/produtos/${product.id}`}
                        className="flex justify-center items-center py-2 px-5 text-gray-700 font-medium rounded-lg"
                    >
                        Ver
                    </Link>

                    {/* Delete */}
                    <div
                        onClick={() => product && onDelete && onDelete(product)}
                        className="flex justify-center items-center py-2 px-4 text-red-600 font-medium rounded-lg"
                    >
                        <Trash size={20} className="mr-1 flex-shrink-0 inline"/>
                        Deletar
                    </div>

                    {/* Edit */}
                    <Link
                        to={relative(`/${product.id}/editar`)}
                        className="flex justify-center items-center py-2 px-5 text-gray-700 font-medium rounded-lg"
                    >
                        Editar
                    </Link>
                </div>}
            </div>
        </HeightTransitioner>
    </div>
}
