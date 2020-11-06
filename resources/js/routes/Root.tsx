import {Redirect, Route} from "react-router-dom";
import {Login}           from "../pages/auth/Login";
import {Overlay}               from "../containers/Overlay";
import {ProtectedRoute}        from "../containers/ProtectedRoute";
import React                   from "react";
import {Register}              from "../pages/auth/Register";
import {Account}               from "./Account";
import {Home}                  from "./Home";
import {Orders}                from "./Orders";
import {Products}              from "./Products";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {Splash}                from "../components/ui/Splash";
import {Favorites}             from "./Favorites";
import {Cart}                  from "./Cart";
import {Admin}                 from "./Admin";

export const Root: React.FC = () => {
    return <Splash>
        <Overlay>
            <SwitchWithTransitions>
                <Route path="/login" children={<Login/>}/>
                <Route path="/register" children={<Register/>}/>

                <ProtectedRoute path="/home" children={<Home/>}/>
                <ProtectedRoute path="/pedidos" children={<Orders/>}/>
                <ProtectedRoute path="/produtos" children={<Products/>}/>
                <ProtectedRoute path="/favoritos" children={<Favorites/>}/>
                <ProtectedRoute path="/conta" children={<Account/>}/>
                <ProtectedRoute path="/carrinho" children={<Cart/>}/>
                <ProtectedRoute path="/admin" children={<Admin/>}/>

                <Redirect to="/home"/>
            </SwitchWithTransitions>
        </Overlay>
    </Splash>
};
