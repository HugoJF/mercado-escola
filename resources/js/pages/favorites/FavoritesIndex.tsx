import React         from "react";
import {Title}       from "../../components/ui/Title";
import {Link}        from "react-router-dom";
import {ProductList} from "../../components/products/ProductList";
import {Empty}       from "../../components/ui/Empty";
import {PagePadding} from "../../containers/PagePadding";
import {ProductType} from "../../types/products";
import {isEmpty}     from "../../helpers/Functions";

export type FavoritesIndexProps = {
    favorites: ProductType[];
}

export const FavoritesIndex: React.FC<FavoritesIndexProps> = ({favorites}) => {
    return <PagePadding className="flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-baseline mb-8">
            <Title>Favoritos</Title>
            <Link to="/favoritos" className="text-gray-500">Ver todos ›</Link>
        </div>

        {/* Empty warning */}
        {isEmpty(favorites) && <div
            className="flex-grow flex flex-col justify-center"
        >
            <Empty
                title="Nenhum favorito!"
                description="Você ainda não possui nenhum produto marcado como favorito"
            />
        </div>}

        {/* Items */}
        <ProductList
            products={favorites}
        />
    </PagePadding>
};
