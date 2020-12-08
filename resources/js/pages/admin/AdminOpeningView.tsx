import React, {useEffect, useState} from "react";
import {useDispatch}                from "react-redux";
import {Dispatch}                   from "../../store";
import {useOpenings}                from "../../selectors";
import {useParams}                 from "react-router-dom";
import {useHistory, useRouteMatch} from "react-router";
import {AnimationBox}              from "../../components/ui/AnimationBox";
import classNames                   from 'classnames';
import {Badge}                      from "../../components/ui/Badge";
import {MoreVertical}               from "react-feather";
import useRelativePath              from "../../hooks/useRelativePath";

export const AdminOpeningView: React.FC = () => {
    const [selected, setSelected] = useState('resumo');
    const relative = useRelativePath();
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const params = useParams<{ openingId: string }>();
    const openings = useOpenings();
    const openingId = parseInt(params.openingId);
    const opening = openings.openings[openingId];
    const match = useRouteMatch();

    useEffect(() => {
        dispatch.openings.index();
    }, []);

    function goTo(tab: string): void {
        console.log(relative(tab));
        console.log(match);
        history.push(relative(tab));
    }

    console.log(params);
    function isSelected(id: string): boolean {
        return id === selected;
    }

    // @ts-ignore
    return <div className="mx-auto container">
        {/* Header */}
        <div className="flex items-center mb-8 space-x-4">
            <div>
                <Badge>PENDENTE</Badge>
            </div>
            <h1 className="flex-grow text-3xl font-medium">Abertura <span className="font-thin">#1</span></h1>
            <MoreVertical className="flex-shrink text-gray-400"/>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3">
            <AnimationBox>
                {({target, props}) => (
                    <>
                        {/* Resumo */}
                        <div
                            className="transition-all duration-300 ease-out bg-secondary-500 shadow"
                            {...props}
                        />
                        <div
                            key="resumo"
                            className={`transition-colors duration-150
                                flex-col flex-grow items-center bg-gray-100 hover:bg-gray-200
                                text-xl text-gray-700 font-medium cursor-pointer`}
                            onClick={() => goTo('/resumo')}
                        >
                            <div className={classNames(`px-3 py-1 text-center font-normal`, {
                                'text-gray-500': !isSelected('resumo'),
                                'text-gray-800': isSelected('resumo'),
                            })}>Resumo
                            </div>
                            <div
                                className="w-full h-1 bg-gray-300"
                                ref={isSelected('resumo') ? target : null}
                            />
                        </div>

                        {/* Produtos */}
                        <div
                            key="produtos"
                            className={`transition-colors duration-150
                                flex-col flex-grow items-center bg-gray-100 hover:bg-gray-200
                                text-xl text-gray-700 font-medium cursor-pointer`}
                            onClick={() => goTo('/produtos')}
                        >
                            <div className={classNames(`px-3 py-1 text-center font-normal`, {
                                'text-gray-500': !isSelected('produtos'),
                                'text-gray-800': isSelected('produtos'),
                            })}>Produtos
                            </div>
                            <div
                                className="w-full h-1 bg-gray-300"
                                ref={isSelected('produtos') ? target : null}
                            />
                        </div>

                        {/* Pedidos */}
                        <div
                            key="Pedidos"
                            className={`transition-colors duration-150
                                flex-col flex-grow items-center bg-gray-100 hover:bg-gray-200
                                text-xl text-gray-700 font-medium cursor-pointer`}
                            onClick={() => goTo('/pedidos')}
                        >
                            <div className={classNames(`px-3 py-1 text-center font-normal`, {
                                'text-gray-500': !isSelected('pedidos'),
                                'text-gray-800': isSelected('pedidos')
                            })}>Pedidos
                            </div>
                            <div
                                className="w-full h-1 bg-gray-300"
                                ref={isSelected('pedidos') ? target : null}
                            />
                        </div>
                    </>
                )}
            </AnimationBox>
        </div>
    </div>
};
