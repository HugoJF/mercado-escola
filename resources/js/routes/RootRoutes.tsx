import React                   from "react";
import {Redirect, Route}       from "react-router-dom";
import {OnBoardingRoutes}      from "./OnBoardingRoutes";
import {FavoritesRoutes}       from "./FavoritesRoutes";
import {ProductsRoutes}        from "./ProductsRoutes";
import {AccountRoutes}         from "./AccountRoutes";
import {OrdersRoutes}          from "./OrdersRoutes";
import {AdminRoutes}           from "./AdminRoutes";
import {CartRoutes}            from "./CartRoutes";
import {HomeRoutes}            from "./HomeRoutes";
import {ProtectedRoute}        from "../containers/ProtectedRoute";
import {Overlay}               from "../containers/Overlay";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {Splash}                from "../components/ui/Splash";
import {Online}                from "../components/ui/Online";
import {ForgotPasswordSuccess} from "../pages/auth/ForgotPasswordSuccess";
import {ForgotPassword}        from "../pages/auth/ForgotPassword";
import {ResetPassword}         from "../pages/auth/ResetPassword";
import {Register}              from "../pages/auth/Register";
import {Login}                 from "../pages/auth/Login";

export const RootRoutes: React.FC = () => {
    return <Splash>
        <Online>
            <Overlay>
                <SwitchWithTransitions>
                    <Route path="/login" children={<Login/>}/>
                    <Route path="/register" children={<Register/>}/>
                    <Route exact path="/forgot-password" children={<ForgotPassword/>}/>
                    <Route exact path="/forgot-password/success" children={<ForgotPasswordSuccess/>}/>
                    <Route path="/reset-password/:token" children={<ResetPassword/>}/>

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
        </Online>
    </Splash>
};
