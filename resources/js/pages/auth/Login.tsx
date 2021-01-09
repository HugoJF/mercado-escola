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
                <h1 className="mb-10 text-center text-4xl text-gray-800 font-medium leading-none tracking-tight">
                    Mercado Escola
                </h1>

                {failed && <div className="flex items-center space-x-3 w-full my-4 px-3 py-3 text-white text-center bg-red-500 font-medium rounded-lg">
                    <span className="flex flex-shrink-0 items-center justify-center w-8 h-8 text-red-500 text-lg font-bold bg-white rounded-full">!</span>
                    Email e senha inválidos! Por favor tente novamente.
                </div>}

                <div>
                    <div>
                        <Input
                            name="email"
                            label="Email"
                            error={errors.email}
                            inputProps={{
                                ref: register({required: true})
                            }}
                        />
                    </div>

                    <div className="my-8">
                        <Input
                            name="password"
                            label="Password"
                            error={errors.password}
                            inputProps={{
                                ref: register({required: true}),
                                type: 'password',
                            }}
                        />

                        <div className="flex justify-end mt-4">
                            <button className="text-right text-orange-500 font-medium">Esqueceu a sua senha?</button>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Button loading={loading}>
                            Entrar
                        </Button>
                    </div>

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
