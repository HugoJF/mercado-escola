import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {AdminProductIndex}     from "../pages/admin/products/AdminProductIndex";
import {AdminProductEdit}      from "../pages/admin/products/AdminProductEdit";
import {AdminIndex}            from "../pages/admin/AdminIndex";
import {AdminProductCreate}    from "../pages/admin/products/AdminProductCreate";
import {AdminOpeningIndex}     from "../pages/admin/openings/AdminOpeningIndex";
import {AdminOpeningCreate} from "../pages/admin/openings/AdminOpeningCreate";
import {AdminOpeningEdit}   from "../pages/admin/openings/AdminOpeningEdit";
import {AdminProducerIndex} from "../pages/admin/producers/AdminProducerIndex";
import {AdminOpeningView} from "../pages/admin/openings/AdminOpeningView";
import {AdminUserIndex}   from "../pages/admin/users/AdminUserIndex";

export const AdminRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<AdminIndex/>}/>
        <Route exact path={relative('/produtos')} children={<AdminProductIndex/>}/>
        <Route exact path={relative('/aberturas')} children={<AdminOpeningIndex/>}/>
        <Route exact path={relative('/produtores')} children={<AdminProducerIndex/>}/>
        <Route exact path={relative('/usuarios')} children={<AdminUserIndex/>}/>
        <Route exact path={relative('/produtos/novo')} children={<AdminProductCreate/>}/>
        <Route exact path={relative('/aberturas/novo')} children={<AdminOpeningCreate/>}/>
        <Route path={relative('/produtos/:productId/editar')} children={<AdminProductEdit/>}/>
        <Route path={relative('/aberturas/:openingId/editar')} children={<AdminOpeningEdit/>}/>
        <Route path={relative('/aberturas/:openingId')} children={<AdminOpeningView/>}/>
    </SwitchWithTransitions>
};
