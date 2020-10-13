import React from "react";

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
                    <a className="text-gray-500">Ver todos</a>
                </div>

                {/* Items */}
                <div className="flex py-1 overflow-x-auto">
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
