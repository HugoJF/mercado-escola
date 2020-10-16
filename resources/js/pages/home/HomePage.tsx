import React, {useEffect} from "react";
import {Product}          from "../../components/Product";
import {Title}            from "../../components/Title";
import {Link}             from "react-router-dom";
import {useDispatch}      from "react-redux";
import {Dispatch}         from "../../store";
import {useProducts}      from "../../selectors";

export const HomePage: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const products = useProducts();

    useEffect(() => {
        dispatch.openings.index();
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
                <div className="flex space-x-8 py-1 overflow-x-auto">
                    {['Brócolis', 'Cenoura', 'Batata'].map(name => (
                        <Product
                            url={`/produtos/${name}`}
                            image={`https://picsum.photos/seed/${name}/200/300`}
                            name={name}
                            cost={455}
                            quantity="unidade"
                        />
                    ))}
                </div>
            </div>

            <div className="mb-16">
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <Title>Produtos</Title>
                    <Link to="/produtos/tag/desconto" className="text-gray-500">Ver todos ›</Link>
                </div>

                {/* Items */}
                <div className="flex pb-4 space-x-8 overflow-x-auto">
                    {
                        Object.values(products.products).map(product => (
                            <Product
                                url={`/produtos/${product.id}`}
                                image={`https://picsum.photos/seed/${product.id}/200/300`}
                                name={product.title}
                                cost={product.quantity_cost}
                                quantity={product.quantity_type}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    </>
};
