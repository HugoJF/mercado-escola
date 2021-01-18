import React                      from "react";
import {Title}                    from "../../components/ui/Title";
import {Link}                     from "react-router-dom";
import {useDispatch}              from "react-redux";
import {Dispatch}                 from "../../store";
import {useOpenings, useProducts} from "../../selectors";
import {ProductList}              from "../../components/products/ProductList";
import {Empty}                    from "../../components/ui/Empty";
import {PagePadding}              from "../../containers/PagePadding";
import {ProductType}              from "../../models/products";
import useLoadEffect              from "../../hooks/useLoadEffect";

export const HomePage: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const openings = useOpenings();
    const products = useProducts();

    const loading = useLoadEffect(async () => {
        await Promise.all([
            dispatch.openings.current(),
            dispatch.favorites.index(),
        ])
    }, []);

    // FIXME: maybe move to productlist
    function getProducts(): ProductType[] {
        if (!openings.current) {
            return [];
        }

        const openingProductIds = openings.openings[openings.current].products;

        return openingProductIds
            .filter(id => !!products.products[id])
            .map(id => products.products[id]);
    }

    // @ts-ignore
    return <PagePadding className="flex flex-col">
        {!loading && !openings.current && <div className="flex-grow flex flex-col justify-center">
            <Empty
                title="Nenhuma abertura ativa!"
                description="Não há nenhuma abertura ativa no momento. Por favor verique novamente mais tarde!"
            />
        </div>}

        {/* Items */}
        {openings.current && <>
            {/* Header */}
            {/* @ts-ignore */}
            <div onClick={() => alert(([1,2])[4]())} className="flex justify-between items-baseline mb-8">
                <Title>Produtos</Title>
                <Link to="/produtos" className="text-gray-500">Ver todos ›</Link>
            </div>

            <ProductList products={getProducts()}/>
        </>}
    </PagePadding>
};
