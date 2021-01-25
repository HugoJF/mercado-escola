import React, {useEffect, useState}              from "react";
import {useDispatch}                             from "react-redux";
import {Dispatch}                                from "../../store";
import {useOpenings}                             from "../../selectors";
import {Redirect, Route, useLocation, useParams} from "react-router-dom";
import {useHistory}                              from "react-router";
import {AnimationBox}                            from "../../components/ui/AnimationBox";
import classNames                                from 'classnames';
import {Badge}                                   from "../../components/ui/Badge";
import {MoreVertical}                            from "react-feather";
import useRelativePath                           from "../../hooks/useRelativePath";
import {SwitchWithTransitions}                   from "../../components/ui/SwitchWithTransition";
import {PagePadding}                             from "../../containers/PagePadding";
import {AdminOpeningViewProducts}                from "./AdminOpeningViewProducts";
import {AdminOpeningViewOrders}                  from "./AdminOpeningViewOrders";
import {AdminOpeningViewSummary}                 from "./AdminOpeningViewSummaryProps";

export const AdminOpeningView: React.FC = () => {
    const [selected, setSelected] = useState('resumo');
    const relative = useRelativePath();
    const location = useLocation();
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const params = useParams<{ openingId: string }>();
    const openings = useOpenings();
    const openingId = parseInt(params.openingId);
    const opening = openings.openings[openingId];

    // TODO: this can probably be merged with SwitchWithTransitions extracted code from a switch
    useEffect(() => {
        // Sorry for this
        const allowed = ['resumo', 'pedidos', 'produtos'];
        const pathname = location.pathname;
        const parts = pathname.split('/');
        const last = parts[parts.length - 1];

        if (allowed.includes(last)) {
            setSelected(last);
        }
    }, [location]);

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
    return <PagePadding className="flex flex-col space-y-4 h-full">
        {/* Header */}
        <div className="flex items-center space-x-4">
            <div>
                <Badge>PENDENTE</Badge>
            </div>
            <h1 className="flex-grow text-2xl font-medium">Abertura <span className="font-thin">#1</span></h1>
            <MoreVertical className="flex-shrink text-gray-400"/>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3">
            <AnimationBox dependencies={[selected]}>
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
                            <div
                                className={classNames(`px-3 py-2 text-center text-base font-normal`, {
                                    'text-gray-500': !isSelected('resumo'),
                                    'text-gray-800': isSelected('resumo'),
                                })}
                            >
                                Resumo
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
                            <div
                                className={classNames(`px-3 py-2 text-center text-base font-normal`, {
                                    'text-gray-500': !isSelected('produtos'),
                                    'text-gray-800': isSelected('produtos'),
                                })}
                            >
                                Produtos
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
                            <div
                                className={classNames(`px-3 py-2 text-center text-base font-normal`, {
                                    'text-gray-500': !isSelected('pedidos'),
                                    'text-gray-800': isSelected('pedidos')
                                })}
                            >
                                Pedidos
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
                <Route path={relative('/produtos')} children={<AdminOpeningViewProducts opening={opening}/>}/>
                <Route path={relative('/pedidos')} children={<AdminOpeningViewOrders opening={opening}/>}/>

                <Redirect to={relative('/resumo')}/>
            </SwitchWithTransitions>
        </div>
    </PagePadding>
};
