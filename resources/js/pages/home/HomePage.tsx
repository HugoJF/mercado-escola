import React     from "react";
import {Link}    from "react-router-dom";
import {Product} from "../../components/Product";

export const HomePage: React.FC = () => {
    return <>
        <div className="mx-auto container pt-8">
            <div className="mx-auto container flex justify-around">
                {['Frutas', 'Verduras', 'Legumes'].map(name => (
                    <div className="transition-colors duration-150
                        flex items-stretch px-8
                        rounded-lg cursor-pointer"
                    >
                        <button className="py-3 px-5 text-primary-500 bg-primary-100 border-2 border-primary-300 font-medium rounded-full">{name}</button>
                    </div>
                ))}
            </div>

            <div className="mb-16">
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <h2 className="text-3xl tracking-wider">Favoritos</h2>
                    <a className="text-gray-500">Ver todos ›</a>
                </div>

                {/* Items */}
                <div className="flex py-1 overflow-x-auto">
                    {['Brócolis', 'Cenoura', 'Batata'].map(name => (
                        <Product
                            url={`/produtos/${name}`}
                            image="https://conteudo.imguol.com.br/c/entretenimento/0e/2017/10/15/batata-crua-1508077604971_v2_1920x1269.jpg"
                            name={name}
                            cost={4.3}
                            quantity="unidade"
                        />
                    ))}
                </div>
            </div>

            <div className="mb-16">
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <h2 className="text-3xl tracking-wider">Descontos do dia</h2>
                    <a className="text-gray-500">Ver todos ›</a>
                </div>

                {/* Items */}
                <div className="flex">
                    {['Brócolis', 'Cenoura', 'Batata', 'Banana'].map(name => (
                        <Product
                            url={`/produtos/${name}`}
                            image="https://conteudo.imguol.com.br/c/entretenimento/0e/2017/10/15/batata-crua-1508077604971_v2_1920x1269.jpg"
                            name={name}
                            cost={4.3}
                            quantity="unidade"
                        />
                    ))}
                </div>
            </div>
        </div>
    </>
};
