import React from 'react';
import {Route} from "react-router";
import useRelativePath from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {AdminProductEditContainer} from "../pages/admin/products/AdminProductEditContainer";
import {AdminIndex} from "../pages/admin/AdminIndex";
import {AdminProductCreate} from "../pages/admin/products/AdminProductCreate";
import {AdminOpeningCreate} from "../pages/admin/openings/AdminOpeningCreate";
import {AdminOpeningEditContainer} from "../pages/admin/openings/AdminOpeningEditContainer";
import {AdminProducerIndex} from "../pages/admin/producers/AdminProducerIndex";
import {AdminUserIndexContainer} from "../pages/admin/users/AdminUserIndexContainer";
import {AdminOpeningIndexContainer} from "../pages/admin/openings/AdminOpeningIndexContainer";
import {AdminProductIndexContainer} from "../pages/admin/products/AdminProductIndexContainer";
import {AdminOpeningViewContainer} from "../pages/admin/openings/AdminOpeningViewContainer";
import {AdminOpeningReportContainer} from "../pages/admin/openings/AdminOpeningReportContainer";

export const AdminRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<AdminIndex/>}/>
        <Route exact path={relative('/produtos')} children={<AdminProductIndexContainer/>}/>
        <Route exact path={relative('/aberturas')} children={<AdminOpeningIndexContainer/>}/>
        <Route exact path={relative('/produtores')} children={<AdminProducerIndex/>}/>
        <Route exact path={relative('/usuarios')} children={<AdminUserIndexContainer/>}/>
        <Route exact path={relative('/produtos/novo')} children={<AdminProductCreate/>}/>
        <Route exact path={relative('/aberturas/novo')} children={<AdminOpeningCreate/>}/>
        <Route path={relative('/produtos/:productId/editar')} children={<AdminProductEditContainer/>}/>
        <Route path={relative('/aberturas/:openingId/editar')} children={<AdminOpeningEditContainer/>}/>
        <Route path={relative('/aberturas/:openingId/relatorio')} children={<AdminOpeningReportContainer/>}/>
        <Route path={relative('/aberturas/:openingId')} children={<AdminOpeningViewContainer/>}/>
    </SwitchWithTransitions>
};
