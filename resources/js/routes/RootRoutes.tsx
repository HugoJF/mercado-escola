import {Redirect, Route}       from "react-router-dom";
import {Login}                 from "../pages/auth/Login";
import {Overlay}               from "../containers/Overlay";
import {ProtectedRoute}        from "../containers/ProtectedRoute";
import React                   from "react";
import {Register}              from "../pages/auth/Register";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {Splash}                from "../components/ui/Splash";
import {HomeRoutes}            from "./HomeRoutes";
import {OrdersRoutes}          from "./OrdersRoutes";
import {ProductsRoutes}        from "./ProductsRoutes";
import {FavoritesRoutes}       from "./FavoritesRoutes";
import {AccountRoutes}         from "./AccountRoutes";
import {CartRoutes}            from "./CartRoutes";
import {AdminRoutes}           from "./AdminRoutes";
import {OnBoardingRoutes}      from "./OnBoardingRoutes";

export const RootRoutes: React.FC = () => {
    return <Splash>
        <Overlay>
            <SwitchWithTransitions>
                <Route path="/login" children={<Login/>}/>
                <Route path="/register" children={<Register/>}/>

                <ProtectedRoute path="/home" children={<HomeRoutes/>}/>
                <ProtectedRoute path="/on-boarding" children={<OnBoardingRoutes/>}/>
                <ProtectedRoute path="/pedidos" children={<OrdersRoutes/>}/>
                <ProtectedRoute path="/produtos" children={<ProductsRoutes/>}/>
                <ProtectedRoute path="/favoritos" children={<FavoritesRoutes/>}/>
                <ProtectedRoute path="/conta" children={<AccountRoutes/>}/>
                <ProtectedRoute path="/carrinho" children={<CartRoutes/>}/>
                <ProtectedRoute path="/admin" children={<AdminRoutes/>}/>

                <Redirect to="/home"/>
            </SwitchWithTransitions>
        </Overlay>
    </Splash>
};
