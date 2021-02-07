import React, {useEffect, useState}              from "react";
import {useDispatch}                             from "react-redux";
import {Dispatch}                                from "../../../store";
import {useOpenings}                             from "../../../selectors";
import {Redirect, Route, useLocation, useParams} from "react-router-dom";
import {useHistory}               from "react-router";
import {AnimationBox}             from "../../../components/ui/AnimationBox";
import classNames                 from 'classnames';
import {Badge}                    from "../../../components/ui/Badge";
import {MoreVertical}             from "react-feather";
import useRelativePath            from "../../../hooks/useRelativePath";
import {SwitchWithTransitions}    from "../../../components/ui/SwitchWithTransition";
import {PagePadding}              from "../../../containers/PagePadding";
import {AdminOpeningViewProducts} from "./AdminOpeningViewProducts";
import {AdminOpeningViewOrders}   from "./AdminOpeningViewOrders";
import {AdminOpeningViewSummary}  from "./AdminOpeningViewSummaryProps";
import {OpeningBadge}             from "../../../components/openings/OpeningBadge";
import {AdminOpeningIndex}        from "./AdminOpeningIndex";
import useLoadEffect              from "../../../hooks/useLoadEffect";
import {Loading}                  from "../../../components/ui/Loading";
import {AdminOpeningView}         from "./AdminOpeningView";

export const AdminOpeningViewContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const params = useParams<{ openingId: string }>();
    const openings = useOpenings();
    const openingId = parseInt(params.openingId);
    const opening = openings.openings[openingId];

    const loading = useLoadEffect(async () => {
        await dispatch.openings.index();
    }, []);

    return <Loading loading={loading}>
        <AdminOpeningView
            opening={opening}
        />
    </Loading>
};
