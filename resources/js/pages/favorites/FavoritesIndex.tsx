import React, {useEffect}          from "react";
import {Title}                     from "../../components/ui/Title";
import {Link}                      from "react-router-dom";
import {useDispatch}               from "react-redux";
import {Dispatch}                  from "../../store";
import {useFavorites, useProducts} from "../../selectors";
import {ProductList}               from "../../components/product/ProductList";
import {Empty}                     from "../../components/ui/Empty";
import {PagePadding}               from "../../containers/PagePadding";

export const FavoritesIndex: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const favorites = useFavorites();
    const products = useProducts();

    useEffect(() => {
        dispatch.openings.index();
        dispatch.favorites.index();
    }, []);

    return <PagePadding>
        <div className="mx-auto container">
            <div>
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <Title>Favoritos</Title>
                    <Link to="/favoritos" className="text-gray-500">Ver todos ›</Link>
                </div>

                {/* Empty warning */}
                {Object.values(favorites.favorites).length === 0 && <Empty
                    title="Nenhum favorito!"
                    description="Você ainda não possui nenhum produto marcado como favorito"
                />}

                {/* Items */}
                <ProductList products={Object.values(products.products).filter(product => favorites.favorites.indexOf(product.id) >= 0)}/>
            </div>
        </div>
    </PagePadding>
};
