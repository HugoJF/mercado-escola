import React, {useEffect}          from "react";
import {Title}                     from "../../components/ui/Title";
import {Link}                      from "react-router-dom";
import {useDispatch}               from "react-redux";
import {Dispatch}                  from "../../store";
import {useFavorites, useProducts} from "../../selectors";
import {ProductList}               from "../../components/product/ProductList";
import {Archive}                   from "react-feather";

export const FavoritesIndex: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const favorites = useFavorites();
    const products = useProducts();

    useEffect(() => {
        dispatch.openings.index();
        dispatch.favorites.index();
    }, []);

    return <>
        <div className="mx-auto container">
            <div>
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <Title>Favoritos</Title>
                    <Link to="/favoritos" className="text-gray-500">Ver todos ›</Link>
                </div>

                {/* Empty warning */}
                {Object.values(favorites.favorites).length === 0 && <div className="flex flex-col justify-center items-center">
                    <Archive size={64} className="text-gray-400"/>
                    <h2 className="mt-4 text-lg">Nenhum favorito!</h2>
                    <p className="mt-2 text-center text-sm text-gray-400 tracking-tight">Você ainda não possui nenhum produto marcado como favorito</p>
                </div>}

                {/* Items */}
                <ProductList products={Object.values(products.products).filter(product => favorites.favorites.indexOf(product.id) >= 0)}/>
            </div>
        </div>
    </>
};
