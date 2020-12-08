import React, {useEffect, useState} from "react";
import {useDispatch}                from "react-redux";
import {Dispatch}                   from "../../store";
import {useOpenings}                from "../../selectors";
import {Redirect, Route, useParams} from "react-router-dom";
import {useHistory}                 from "react-router";
import {AnimationBox}               from "../../components/ui/AnimationBox";
import classNames                   from 'classnames';
import {Badge}                      from "../../components/ui/Badge";
import {MoreVertical}               from "react-feather";
import useRelativePath              from "../../hooks/useRelativePath";
import {SwitchWithTransitions}      from "../../components/ui/SwitchWithTransition";
import {AdminOpeningViewSummary}    from "./AdminOpeningViewSummary";

export const AdminOpeningView: React.FC = () => {
    const [selected, setSelected] = useState('resumo');
    const relative = useRelativePath();
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const params = useParams<{ openingId: string }>();
    const openings = useOpenings();
    const openingId = parseInt(params.openingId);
    const opening = openings.openings[openingId];

    useEffect(() => {
        dispatch.openings.index();
    }, []);

    function goTo(tab: string): void {
        history.push(relative('/' + tab));
        setSelected(tab);
    }

    function isSelected(id: string): boolean {
        return id === selected;
    }

    // @ts-ignore
    return <div className="flex flex-col mx-auto min-h-full container">
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
                            className="transition-all duration-300 border-b border-secondary-500 ease-out bg-secondary-500 rounded-b shadow box-content"
                            {...props}
                        />
                        <div
                            key="resumo"
                            className={`transition-colors duration-150
                                flex-col flex-grow items-center bg-gray-100 hover:bg-gray-200
                                text-xl text-gray-700 font-medium cursor-pointer`}
                            onClick={() => goTo('resumo')}
                        >
                            <div className={classNames(`px-3 py-1 text-center font-normal`, {
                                'text-gray-500': !isSelected('resumo'),
                                'text-gray-800': isSelected('resumo'),
                            })}>Resumo
                            </div>
                            <div
                                className="w-full h-0.5 bg-gray-300"
                                ref={isSelected('resumo') ? target : null}
                            />
                        </div>

                        {/* Produtos */}
                        <div
                            key="produtos"
                            className={`transition-colors duration-150
                                flex-col flex-grow items-center bg-gray-100 hover:bg-gray-200
                                text-xl text-gray-700 font-medium cursor-pointer`}
                            onClick={() => goTo('produtos')}
                        >
                            <div className={classNames(`px-3 py-1 text-center font-normal`, {
                                'text-gray-500': !isSelected('produtos'),
                                'text-gray-800': isSelected('produtos'),
                            })}>Produtos
                            </div>
                            <div
                                className="w-full h-0.5 bg-gray-300"
                                ref={isSelected('produtos') ? target : null}
                            />
                        </div>

                        {/* Pedidos */}
                        <div
                            key="Pedidos"
                            className={`transition-colors duration-150
                                flex-col flex-grow items-center bg-gray-100 hover:bg-gray-200
                                text-xl text-gray-700 font-medium cursor-pointer`}
                            onClick={() => goTo('pedidos')}
                        >
                            <div className={classNames(`px-3 py-1 text-center font-normal`, {
                                'text-gray-500': !isSelected('pedidos'),
                                'text-gray-800': isSelected('pedidos')
                            })}>Pedidos
                            </div>
                            <div
                                className="w-full h-0.5 bg-gray-300"
                                ref={isSelected('pedidos') ? target : null}
                            />
                        </div>
                    </>
                )}
            </AnimationBox>
        </div>

        <div className="flex-grow relative">
            <SwitchWithTransitions>
                <Route path={relative('/resumo')} children={<AdminOpeningViewSummary opening={opening}/>}/>
                <Route path={relative('/produtos')} children={<h1>produtos</h1>}/>
                <Route path={relative('/pedidos')} children={<h1>pedidos</h1>}/>

                <Redirect to={relative('/resumo')}/>
            </SwitchWithTransitions>
        </div>

    </div>
};
