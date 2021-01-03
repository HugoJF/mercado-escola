import React, {useEffect, useState} from "react";
import {useDispatch}    from "react-redux";
import {Dispatch}       from "../../store";
import {useHistory}     from "react-router-dom";
import {Title}          from "../../components/ui/Title";
import {Loader}         from "react-feather";
import {useForm}        from "react-hook-form";
import InputMask        from "react-input-mask";
import classNames       from 'classnames';
import {UserProperties} from "../../models/auth";
import {useAuth}        from "../../selectors";
import {PhoneInput}     from "../../components/form/PhoneInput";
import {PagePadding}    from "../../containers/PagePadding";

interface PhoneUpdateForm {
    phone: string,
}

export const PhoneUpdate: React.FC = () => {
    const auth = useAuth();
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, errors, setValue} = useForm<PhoneUpdateForm>();

    useEffect(() => {
        if (auth.me?.phone) {
            setValue('phone', auth.me.phone);
        }
    }, [setValue, auth.me?.phone]);


    async function updatePhone(data: PhoneUpdateForm) {
        setLoading(true);
        await dispatch.auth.update({
            phone: data.phone,
        });
        setLoading(false);
        history.goBack();
    }

    return <PagePadding>
        <Title>Digite seu telefone</Title>
        <form className="mt-8 px-4 w-full" onSubmit={handleSubmit(updatePhone)}>
            <label className={classNames(
                {
                    'text-red-500': errors.phone,
                    'text-gray-500': !errors.phone,
                }
            )} htmlFor="#phone">Telefone</label>
            <PhoneInput
                className={`transition-colors duration-300 block w-full mb-8 py-3 px-4 text-black bg-transparent border-b border-lg${errors.phone ? ' border-red-500' : ''}`}
                id="phone"
                name="phone"
                type="text"
                mask="(67) 9 9999 9999"
                /* This is needed in order to also update react-input-mask state, since react-hook-form operates directly on the DOM */
                initialValue={auth.me?.phone ?? ''}
                /* @ts-ignore */
                ref={register({required: true})}
            />

            <button className="w-full py-4 bg-primary-500 text-center text-xl text-white font-medium rounded-lg">
                {loading ?
                    <Loader size={30} className="animate-spin mx-auto block"/>
                    :
                    <span>Atualizar</span>
                }
            </button>
        </form>
    </PagePadding>
};
