import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Dispatch} from "~/store";
import {Input} from "@components/form/Input";
import {Button} from "@components/ui/Button";
import useNavigation from "@hooks/useNavigation";
import {Title} from "@components/ui/Title";
import {PagePadding} from "@containers/PagePadding";
import useFormy from "@hooks/useMyFormy";

type Form = {
    email: string;
}

export const ForgotPassword: React.FC<object> = () => {
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();
    const [loading, setLoading] = useState(false);
    const {setErrors, form: {register, handleSubmit, formState: {errors}}} = useFormy<Form>();

    async function requestPasswordReset(params: Form) {
        setLoading(true);
        try {
            await dispatch.auth.forgotPassword(params.email);
            go('/forgot-password/success');
        } catch (e) {
            setErrors(e.response.data.errors);
            setLoading(false);
        }
    }

    return <PagePadding>
        <div className="mx-auto container">
            <form onSubmit={handleSubmit(requestPasswordReset)}>
                <Title>Esqueci minha senha</Title>

                <div>
                    {/* Email */}
                    <div className="mt-8">
                        <Input
                            name="email"
                            label="Email"
                            error={errors.email}
                            inputProps={{
                                ...register('email', {required: 'Digite o email da sua conta'}),
                                placeholder: 'Digite o email da sua conta',
                                type: 'email',
                            }}
                        />
                    </div>

                    <Button className="w-full mt-8" loading={loading}>Enviar email</Button>
                </div>
            </form>
        </div>
    </PagePadding>
};
