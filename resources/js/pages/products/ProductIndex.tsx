import React         from "react";
import {Title}       from "../../components/ui/Title";
import {Link}        from "react-router-dom";
import {ProductList} from "../../components/products/ProductList";
import {PagePadding} from "../../containers/PagePadding";
import {useQuery}    from "react-query";
import {api}         from "../../api";
import {Loading}     from "../../components/ui/Loading";

export const ProductIndex: React.FC = () => {
    const {status, data, error, isFetching} = useQuery('products', api.products.index);

    return <PagePadding>
        <div className="mx-auto container">
            <div>
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <Title>Produtos</Title>
                    <Link to="/produtos" className="text-gray-500">Ver todos ›</Link>
                </div>

                {/* Items */}
                {data
                    ?
                    <ProductList products={data.data.data}/>
                    :
                    <Loading/>
                }
            </div>
        </div>
    </PagePadding>
};
