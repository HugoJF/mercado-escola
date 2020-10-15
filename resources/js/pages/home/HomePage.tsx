import React     from "react";
import {Product} from "../../components/Product";
import {Title}   from "../../components/Title";
import {Link}    from "react-router-dom";

export const HomePage: React.FC = () => {
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
                    <Title>Descontos do dia</Title>
                    <Link to="/produtos/tag/desconto" className="text-gray-500">Ver todos ›</Link>
                </div>

                {/* Items */}
                <div className="flex space-x-8">
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
