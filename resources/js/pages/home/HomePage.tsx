import React         from "react";
import {Title}       from "../../components/ui/Title";
import {Link}        from "react-router-dom";
import {ProductList} from "../../components/products/ProductList";
import {Empty}       from "../../components/ui/Empty";
import {PagePadding} from "../../containers/PagePadding";
import {useQuery}    from "react-query";
import {api}         from "../../api";
import {isEmpty}     from "../../helpers/Functions";
import {Loading}     from "../../components/ui/Loading";

export const HomePage: React.FC = () => {
    const {status, data, error, isFetching} = useQuery('products', api.openings.current);

    return <PagePadding className="flex flex-col">
        {!data && <Loading/>}

        {data && isEmpty(data.data.data) && <div className="flex-grow flex flex-col justify-center">
            <Empty
                title="Nenhuma abertura ativa!"
                description="Não há nenhuma abertura ativa no momento. Por favor verique novamente mais tarde!"
            />
        </div>}

        {/* Items */}
        {data && !isEmpty(data.data.data) && <>
            {/* Header */}
            <div className="flex justify-between items-baseline mb-8">
                <Title>Produtos</Title>
                <Link to="/produtos" className="text-gray-500">Ver todos ›</Link>
            </div>

            <ProductList products={data.data.data.products}/>
        </>}
    </PagePadding>
};
