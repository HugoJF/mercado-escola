import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {AdminProductIndex}     from "../pages/admin/AdminProductIndex";
import {AdminProductEdit}      from "../pages/admin/AdminProductEdit";
import {AdminIndex}            from "../pages/admin/AdminIndex";
import {AdminProductCreate}    from "../pages/admin/AdminProductCreate";
import {AdminOrderIndex}       from "../pages/admin/AdminOrderIndex";

export const Admin: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<AdminIndex/>}/>
        <Route exact path={relative('/produtos')} children={<AdminProductIndex/>}/>
        <Route exact path={relative('/pedidos')} children={<AdminOrderIndex/>}/>
        <Route exact path={relative('/produtos/novo')} children={<AdminProductCreate/>}/>
        <Route path={relative('/produtos/:productId/editar')} children={<AdminProductEdit/>}/>
    </SwitchWithTransitions>
};
