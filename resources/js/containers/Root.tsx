import {Route}   from "react-router-dom";
import {Login}   from "../pages/auth/Login";
import {Overlay}               from "./Overlay";
import {ProtectedRoute}        from "./ProtectedRoute";
import React, {useEffect}      from "react";
import {useDispatch}           from "react-redux";
import {Dispatch}              from "../store";
import {Register}              from "../components/Register";
import {Account}               from "../routes/Account";
import {Home}                  from "../routes/Home";
import {Orders}                from "../routes/Orders";
import {Products}              from "../routes/Products";
import {SwitchWithTransitions} from "../components/SwitchWithTransition";
import {Splash}                from "../components/Splash";

export const Root: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        dispatch.auth.me();
    }, []);

    return <Splash>
        <Overlay>
            <div className="p-4">
                <SwitchWithTransitions>
                    <Route path="/login" children={<Login/>}/>
                    <Route path="/register" children={<Register/>}/>

                    <ProtectedRoute exact path="/" children={<Home/>}/>
                    <ProtectedRoute path="/pedidos" children={<Orders/>}/>
                    <ProtectedRoute path="/produtos" children={<Products/>}/>
                    <ProtectedRoute exact path="/favoritos" children={<h1>Favoritoss</h1>}/>
                    <ProtectedRoute path="/conta" children={<Account/>}/>
                </SwitchWithTransitions>
            </div>
        </Overlay>
    </Splash>
};
