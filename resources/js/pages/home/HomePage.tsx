import React, {useEffect}         from "react";
import {Title}                    from "../../components/ui/Title";
import {Link}                     from "react-router-dom";
import {useDispatch}              from "react-redux";
import {Dispatch}                 from "../../store";
import {useOpenings, useProducts} from "../../selectors";
import {ProductList}              from "../../components/product/ProductList";
import {Empty}                    from "../../components/ui/Empty";

export const HomePage: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const openings = useOpenings();
    const products = useProducts();

    useEffect(() => {
        dispatch.openings.current();
        dispatch.favorites.index();
    }, []);

    return <>
        <div className="mx-auto container">
            {!openings.current && <Empty
                title="Nenhuma abertura ativa!"
                description="Não há nenhuma abertura ativa no momento. Por favor verique novamente mais tarde!"
            />}

            {/* Items */}
            {openings.current && <>
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <Title>Produtos</Title>
                    <Link to="/produtos" className="text-gray-500">Ver todos ›</Link>
                </div>

                <ProductList products={Object.values(products.products)}/>
            </>}
        </div>
    </>
};
