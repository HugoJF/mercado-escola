import React, {useEffect}         from "react";
import {Title}                    from "../../components/ui/Title";
import {Link}                     from "react-router-dom";
import {useDispatch}              from "react-redux";
import {Dispatch}                 from "../../store";
import {useOpenings, useProducts} from "../../selectors";
import {ProductList}              from "../../components/products/ProductList";
import {Empty}                    from "../../components/ui/Empty";
import {PagePadding}              from "../../containers/PagePadding";
import useLoading                 from "../../hooks/useLoading";

export const HomePage: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const openings = useOpenings();
    const products = useProducts();
    const {load, loading} = useLoading();

    useEffect(() => {
        load(async () => {
            await Promise.all([
                dispatch.openings.current(),
                dispatch.favorites.index(),
            ])
        })
    }, []);

    return <PagePadding className="flex flex-col">
        <div className="flex-grow flex flex-col justify-center">
            {!loading && !openings.current && <Empty
                title="Nenhuma abertura ativa!"
                description="Não há nenhuma abertura ativa no momento. Por favor verique novamente mais tarde!"
            />}
        </div>

        {/* Items */}
        {openings.current && <>
            {/* Header */}
            <div className="flex justify-between items-baseline mb-8">
                <Title>Produtos</Title>
                <Link to="/produtos" className="text-gray-500">Ver todos ›</Link>
            </div>

            <ProductList products={
                openings.openings[openings.current].products.map(id => products.products[id])
            }/>
        </>}
    </PagePadding>
};
