import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {AdminProductIndex}     from "../pages/admin/AdminProductIndex";
import {AdminProductEdit}      from "../pages/admin/AdminProductEdit";
import {AdminIndex}            from "../pages/admin/AdminIndex";
import {AdminProductCreate}    from "../pages/admin/AdminProductCreate";
import {AdminOpeningIndex}     from "../pages/admin/AdminOpeningIndex";
import {AdminOpeningCreate}    from "../pages/admin/AdminOpeningCreate";
import {AdminOpeningEdit}      from "../pages/admin/AdminOpeningEdit";
import {AdminProducerIndex}    from "../pages/admin/AdminProducerIndex";
import {AdminOpeningView}      from "../pages/admin/AdminOpeningView";

export const AdminRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<AdminIndex/>}/>
        <Route exact path={relative('/produtos')} children={<AdminProductIndex/>}/>
        <Route exact path={relative('/aberturas')} children={<AdminOpeningIndex/>}/>
        <Route exact path={relative('/produtores')} children={<AdminProducerIndex/>}/>
        <Route exact path={relative('/produtos/novo')} children={<AdminProductCreate/>}/>
        <Route exact path={relative('/aberturas/novo')} children={<AdminOpeningCreate/>}/>
        <Route path={relative('/aberturas/:openingId')} children={<AdminOpeningView/>}/>
        <Route path={relative('/produtos/:productId/editar')} children={<AdminProductEdit/>}/>
        <Route path={relative('/aberturas/:openingId/editar')} children={<AdminOpeningEdit/>}/>
    </SwitchWithTransitions>
};
