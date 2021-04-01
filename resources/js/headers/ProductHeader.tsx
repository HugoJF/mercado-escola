import React from 'react';
import {ChevronLeft, Heart} from "react-feather";
import {HeaderWrapper} from "./partials/HeaderWrapper";
import clsx from 'clsx';
import {ProductType} from "../types/products";
import {Cart} from "./partials/Cart";
import {useHistory} from "react-router";

export type ProductHeaderProps = {
    product: ProductType;
    favorite: boolean;
    onToggleFavorite: () => void;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({product, favorite, onToggleFavorite}) => {
    const history = useHistory();

    return <HeaderWrapper>
        <div className="flex justify-between items-center py-4 px-6">
            <ChevronLeft size={24} className="cursor-pointer" onClick={history.goBack}/>
            <h2 className="text-2xl font-medium truncate leading-none">{product.name}</h2>
            <div
                className={clsx(
                    'transition-colors duration-50', {
                        'text-red-500 ': favorite,
                    }
                )}
                onClick={onToggleFavorite}
            >
                <Heart
                    className="transition-colors duration-150 fill-current"
                    fillOpacity={favorite ? 100 : 0}
                    size={30}
                />
            </div>
        </div>
        <Cart/>
    </HeaderWrapper>
};
