import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Dispatch} from "../../store";
import {Title} from "../../components/ui/Title";
import {Loader} from "react-feather";
import {useForm} from "react-hook-form";
import {useAuth} from "../../selectors";
import clsx from "clsx";
import {PhoneInput} from "../../components/form/PhoneInput";
import {PagePadding} from "../../containers/PagePadding";
import useNavigation from "../../hooks/useNavigation";

type PhoneUpdateForm = {
    phone: string;
}

export const PhoneUpdate: React.FC = () => {
    const auth = useAuth();
    const dispatch = useDispatch<Dispatch>();
    const {goBack} = useNavigation();
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}, setValue} = useForm<PhoneUpdateForm>();

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
        goBack();
    }

    return <PagePadding>
        <Title>Digite seu telefone</Title>
        <form className="mt-8 px-4 w-full" onSubmit={handleSubmit(updatePhone)}>
            <label
                htmlFor="#phone"
                className={clsx({
                    'text-red-500': errors.phone,
                    'text-gray-500': !errors.phone,
                })}
            >
                Telefone
            </label>
            <PhoneInput
                className={clsx(
                    `transition-colors duration-300 block w-full mb-8 py-3 px-4 bg-white text-black bg-white border-b border-lg rounded-lg`,
                    {
                        'border-red-500': errors.phone
                    }
                )}
                id="phone"
                type="text"
                mask="(67) 9 9999 9999"
                /* This is needed in order to also update react-input-mask state, since react-hook-form operates directly on the DOM */
                initialValue={auth.me?.phone ?? ''}
                {...register('phone', {required: true})}
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
