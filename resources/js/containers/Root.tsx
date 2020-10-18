import {Route}                 from "react-router-dom";
import {Login}                 from "../pages/auth/Login";
import {Overlay}               from "./Overlay";
import {ProtectedRoute}        from "./ProtectedRoute";
import React                   from "react";
import {Register}              from "../components/Register";
import {Account}               from "../routes/Account";
import {Home}                  from "../routes/Home";
import {Orders}                from "../routes/Orders";
import {Products}              from "../routes/Products";
import {SwitchWithTransitions} from "../components/SwitchWithTransition";
import {Splash}                from "../components/Splash";
import {Favorites}             from "../routes/Favorites";
import {Cart}                  from "../routes/Cart";

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
            </SwitchWithTransitions>
        </Overlay>
    </Splash>
};
