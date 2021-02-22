import React, {useEffect, useState}       from "react";
import {Redirect, Route, useLocation}     from "react-router-dom";
import {AnimationBox}                     from "../../../components/ui/AnimationBox";
import clsx                               from 'clsx';
import {MoreVertical}                     from "react-feather";
import {SwitchWithTransitions}            from "../../../components/ui/SwitchWithTransition";
import {PagePadding}                      from "../../../containers/PagePadding";
import {AdminOpeningViewProducts}         from "./AdminOpeningViewProducts";
import {AdminOpeningViewOrders}           from "./AdminOpeningViewOrders";
import {AdminOpeningViewSummary}          from "./AdminOpeningViewSummaryProps";
import {OpeningBadge}                     from "../../../components/openings/OpeningBadge";
import {OpeningType, OpeningWithProducts} from "../../../types/openings";
import useNavigation                      from "../../../hooks/useNavigation";

type AdminOpeningTabProps = {
    onClick: () => void;
    selected: boolean;
    target: any; // FIXME
}

const AdminOpeningTabButton: React.FC<AdminOpeningTabProps> = ({onClick, selected, target, children}) => {
    return <div
        className="transition-colors duration-150
                    flex-col flex-grow items-center bg-gray-100 hover:bg-gray-200
                    text-xl text-gray-700 font-medium cursor-pointer"
        onClick={onClick}
    >
        <div
            className={clsx(
                'px-3 py-2 text-center text-base font-normal', {
                    'text-gray-500': !selected,
                    'text-gray-800': selected,
                })}
        >
            {children}
        </div>
        <div
            className="w-full h-0.5 bg-gray-300"
            ref={target}
        />
    </div>
};

export type AdminOpeningViewProps = {
    opening: OpeningType<OpeningWithProducts>;
}

const tabs = {
    resumo: 'Resumo',
    pedidos: 'Pedidos',
    produtos: 'Produtos',
};

export const AdminOpeningView: React.FC<AdminOpeningViewProps> = ({opening}) => {
    const [selected, setSelected] = useState('resumo');
    const {relative, bindGo} = useNavigation();
    const location = useLocation();

    useEffect(() => {
        const allowed = Object.keys(tabs);
        const parts = location.pathname.split('/');
        const last = parts.pop();

        if (last && allowed.includes(last)) {
            setSelected(last);
        }
    }, [location]);

    // @ts-ignore
    return <PagePadding className="flex flex-col space-y-4 h-full">
        {/* Header */}
        <div className="flex items-center space-x-4">
            <OpeningBadge opening={opening}/>
            <h1 className="flex-grow text-2xl font-medium">Abertura <span className="font-thin">#1</span></h1>
            <MoreVertical className="flex-shrink text-gray-400"/>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3">
            <AnimationBox dependencies={[selected]}>
                {({target, props}) => (<>
                    {/* Tab highlight */}
                    <div
                        className="transition-all duration-300 border-b border-secondary-500 ease-out bg-secondary-500 rounded-b shadow box-content"
                        {...props}
                    />

                    {/* Buttons */}
                    {Object.entries(tabs).map(([id, name]) =>
                        <AdminOpeningTabButton
                            onClick={bindGo('./' + id)}
                            selected={selected === id}
                            target={selected === id ? target : null}
                        >
                            {name}
                        </AdminOpeningTabButton>
                    )}
                </>)}
            </AnimationBox>
        </div>

        {/* Page content */}
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
