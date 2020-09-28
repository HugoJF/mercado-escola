import React, {useState} from "react";
import {useDispatch}     from "react-redux";
import {Dispatch}        from "../store";
import {useAuth}         from "../selectors";

export const Login: React.FC<object> = () => {
    const auth = useAuth();
    const dispatch = useDispatch<Dispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(event: React.FormEvent<HTMLInputElement>) {
        setEmail(event.currentTarget.value);
    }

    function handlePasswordChange(event: React.FormEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }

    function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        dispatch.auth.login({email, password});
    }

    return <form onSubmit={handleOnSubmit}>
        <input onChange={handleEmailChange} name="email" type="text"/>
        <input onChange={handlePasswordChange} name="password" type="password"/>

        <p>User state: {!auth ? 'Not authed' : (auth.failed ? 'Failed' : JSON.stringify(auth))}</p>

        <button type="submit">Login</button>
    </form>
};
