import React, {useEffect}          from "react";
import {Title}                     from "../../components/Title";
import {Link}                      from "react-router-dom";
import {useDispatch}               from "react-redux";
import {Dispatch}                  from "../../store";
import {useFavorites, useProducts} from "../../selectors";
import {ProductList}               from "../../components/ProductList";

export const HomePage: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const products = useProducts();
    const favorites = useFavorites();

    useEffect(() => {
        dispatch.openings.index();
        dispatch.favorites.index();
    }, []);

    return <>
        <div className="mx-auto container">
            <div className="mb-4 overflow-x-auto">
                <div className="flex space-x-4">
                    {['Frutas', 'Verduras', 'Legumes', 'a', 'b', 'd'].map(name => (
                        <button className="transition-colors duration-150
                             flex items-stretch py-2 px-5
                             text-primary-500 font-medium
                             bg-primary-100 border-2 border-primary-500 rounded-full
                             rounded-lg cursor-pointer"
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-16">
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <Title>Favoritos</Title>
                    <Link to="/favoritos" className="text-gray-500">Ver todos ›</Link>
                </div>

                {/* Items */}
                <ProductList products={Object.values(products.products).filter(product => favorites.favorites.indexOf(product.id) >= 0)}/>
            </div>

            <div>
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <Title>Produtos</Title>
                    <Link to="/produtos/tag/desconto" className="text-gray-500">Ver todos ›</Link>
                </div>

                {/* Items */}
                <ProductList products={Object.values(products.products)}/>
            </div>
        </div>
    </>
};
