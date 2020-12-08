import React, {useState}  from "react";
import {useDispatch}      from "react-redux";
import {Dispatch}         from "../../store";
import {useAuth}          from "../../selectors";
import {useHistory}       from "react-router";
import {useForm}          from "react-hook-form";
import {LoginCredentials} from "../../models/auth";
import {Link}             from "react-router-dom";
import {Input}            from "../../components/form/Input";
import {Button}           from "../../components/ui/Button";
import {Container}        from "../../containers/Container";

export const Login: React.FC<object> = () => {
    const auth = useAuth();
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, errors} = useForm<LoginCredentials>();

    async function login(credentials: LoginCredentials) {
        setLoading(true);
        try {
            await dispatch.auth.login(credentials);
            history.push('/home');
        } catch (e) {
            // TODO
        }
        setLoading(false);
    }

    const failed = auth?.failed;

    // @ts-ignore
    return <Container>
        <div className="mx-auto container min-h-screen flex justify-center items-center">
            <form className="px-4 w-full" onSubmit={handleSubmit(login)}>
                <h1 className="text-5xl text-center">DiCasa</h1>

                <div>
                    <Input
                        name="email"
                        label="Email"
                        error={errors.email}
                        inputProps={{
                            ref: register({required: true})
                        }}
                    />

                    <Input
                        name="password"
                        label="Password"
                        error={errors.password}
                        inputProps={{
                            ref: register({required: true}),
                            type: 'password',
                        }}
                    />

                    <div className="flex justify-end mb-16">
                        <button className="text-right text-orange-400 font-medium">Esqueceu a sua senha?</button>
                    </div>

                    {failed && <div className="w-full my-4 text-red-500 text-center text-lg font-medium">
                        Email e senha inválidos! Por favor tente novamente.
                    </div>}

                    <Button loading={loading}>
                        Entrar
                    </Button>

                    <div className="text-center mt-8">
                        <Link to="/register" className="w-full text-gray-500">
                            Ainda não possui uma conta?
                            <span className="ml-1 text-orange-400">Registre-se aqui</span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </Container>
};
