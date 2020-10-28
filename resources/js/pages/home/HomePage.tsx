import React, {useEffect}          from "react";
import {Title}                     from "../../components/ui/Title";
import {Link}                      from "react-router-dom";
import {useDispatch}               from "react-redux";
import {Dispatch}                  from "../../store";
import {useFavorites, useProducts} from "../../selectors";
import {ProductList}               from "../../components/product/ProductList";

export const HomePage: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
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
                    <Title>Produtos</Title>
                    <Link to="/produtos" className="text-gray-500">Ver todos ›</Link>
                </div>

                {/* Items */}
                <ProductList products={Object.values(products.products)}/>
            </div>
        </div>
    </>
};
