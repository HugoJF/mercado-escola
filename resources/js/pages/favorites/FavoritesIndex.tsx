import React, {useEffect} from "react";
import {Product}          from "../../components/Product";
import {Title}            from "../../components/Title";
import {Link}             from "react-router-dom";
import {useDispatch}      from "react-redux";
import {Dispatch}                  from "../../store";
import {useFavorites, useProducts} from "../../selectors";

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
            <div className="mb-16">
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <Title>Favoritos</Title>
                    <Link to="/favoritos" className="text-gray-500">Ver todos ›</Link>
                </div>

                {/* Items */}
                <div className="flex space-x-8 py-1 overflow-x-auto">
                    {favorites.favorites.map(id => (
                        <Product
                            url={`/produtos/${id}`}
                            image={`https://picsum.photos/seed/${id}/200/300`}
                            name={products.products[id].title}
                            cost={products.products[id].quantity_cost}
                            quantity={products.products[id].quantity_type}
                        />
                    ))}
                </div>
            </div>
        </div>
    </>
};
