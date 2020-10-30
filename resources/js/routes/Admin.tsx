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

export const Admin: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<AdminIndex/>}/>
        <Route exact path={relative('/produtos')} children={<AdminProductIndex/>}/>
        <Route exact path={relative('/aberturas')} children={<AdminOpeningIndex/>}/>
        <Route exact path={relative('/produtos/novo')} children={<AdminProductCreate/>}/>
        <Route exact path={relative('/aberturas/novo')} children={<AdminOpeningCreate/>}/>
        <Route path={relative('/produtos/:productId/editar')} children={<AdminProductEdit/>}/>
    </SwitchWithTransitions>
};
