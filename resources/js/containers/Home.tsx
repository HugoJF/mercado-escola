import React          from "react";
import {ShoppingCart} from '../css.gg';
import {useLocation}  from "react-router-dom";

export const Home: React.FC = ({children}) => {
    const location = useLocation();

    return <>
        <div className="sticky top-0 w-flex px-6 py-6 space-y-6 flex-col items-stretch bg-primary-600 text-white shadow-md">
            <div className="flex justify-between items-center px-6">
                <h2 className="text-xl font-medium">Olá, Maria 👋</h2>
                <ShoppingCart className="ggs-1/2"/>
            </div>
            <div>
                <input
                    placeholder="Pesquisar produtos..."
                    className="w-full py-3 px-6 rounded-full bg-primary-100 bg-opacity-50 placeholder-white font-medium"
                    type="text"
                />
            </div>
        </div>
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
                    <a className="text-gray-500">Ver todos</a>
                </div>

                {/* Items */}
                <div className="flex">
                    {['Brócolis', 'Cenoura', 'Batata'].map(name => (
                        <div className="transition-shadow duration-150
                            p-4 mx-4 bg-white rounded-lg
                            cursor-pointer shadow hover:shadow-md"
                        >
                            <div className="mx-auto mb-4 h-48 w-48 rounded-full bg-gray-200"/>
                            <h3 className="text-xl text-gray-800 font-medium">{name}</h3>
                            <h4 className="text-lg">
                                <span className="text-secondary-400 font-medium">R$ 4,30</span>
                                <small className="ml-1 text-gray-500 font-thin tracking-tight">pacote</small>
                            </h4>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-16">
                {/* Header */}
                <div className="flex justify-between items-baseline mb-8">
                    <h2 className="text-3xl tracking-wider">Descontos do dia</h2>
                    <a className="text-gray-500">Ver todos</a>
                </div>

                {/* Items */}
                <div className="flex">
                    {['Brócolis', 'Cenoura', 'Batata', 'Banana'].map(name => (
                        <div className="transition-shadow duration-150
                            p-4 mx-4 bg-white rounded-lg
                            cursor-pointer shadow hover:shadow-md"
                        >
                            <div className="mx-auto mb-4 h-48 w-48 rounded-full bg-gray-200"/>
                            <h3 className="text-xl text-gray-800 font-medium">{name}</h3>
                            <h4 className="text-lg">
                                <span className="text-secondary-400 font-medium">R$ 4,30</span>
                                <small className="ml-1 text-gray-500 font-thin tracking-tight">pacote</small>
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
};
