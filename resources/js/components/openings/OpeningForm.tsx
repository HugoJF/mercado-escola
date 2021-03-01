import React, {useEffect, useState}     from "react";
import {Input}                          from "../form/Input";
import {DateTimePicker}                 from "@material-ui/pickers";
import {Button}                         from "../ui/Button";
import {useForm}                        from "react-hook-form";
import {OpeningProperties, OpeningType} from "../../types/openings";
import useLoading                       from "../../hooks/useLoading";
import {FieldWrapper}        from "../form/FieldWrapper";
import {formatISO, parseISO} from "date-fns";

export type OpeningFormProps = {
    opening?: OpeningType;
    onSubmit: (data: OpeningProperties) => void;
    action: string;
}

export const OpeningForm: React.FC<OpeningFormProps> = ({opening, onSubmit, action}) => {
    const {loading, load} = useLoading();
    const [opensAt, setOpensAt] = useState(new Date);
    const [closesAt, setClosesAt] = useState(new Date);
    const [deliversAt, setDeliversAt] = useState(new Date);
    const {register, handleSubmit, errors, setError, setValue} = useForm<OpeningProperties>();

    async function submit(data: OpeningProperties) {
        load(async () => {
            try {
                await onSubmit({
                    ...data,
                    opens_at: formatISO(opensAt),
                    closes_at: formatISO(closesAt),
                    delivers_at: formatISO(deliversAt),
                });
            } catch (e) {
                setErrors(e.errors);
                throw e;
            }
        })
    }

    useEffect(() => {
        if (!opening) {
            return;
        }

        for (let prop of Object.keys(opening)) {
            // @ts-ignore
            setValue(prop, opening[prop]);
        }

        // Manually updates dates that are not handled by react-hook-form
        setOpensAt(parseISO(opening.opens_at));
        setClosesAt(parseISO(opening.closes_at));
        setDeliversAt(parseISO(opening.delivers_at));
    }, [setValue, opening]);

    function setErrors(errors: object) {
        for (let [key, messages] of Object.entries(errors)) {
            // @ts-ignore
            setError(key, {type: 'manual', message: messages[0]});
        }
    }

    return <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <Input
            name="max_delivery_orders"
            label="Quantidade máxima de pedidos delivery"
            error={errors.max_delivery_orders}
            inputProps={{
                ref: register({required: 'Digite quantidade máxima de pedidos delivery'}),
                min: 0,
                type: 'number',
            }}
        />

        <Input
            name="max_pickup_orders"
            label="Quantidade máxima de pedidos retirada"
            error={errors.max_pickup_orders}
            inputProps={{
                ref: register({required: 'Digite quantidade máxima de pedidos retirada'}),
                min: 0,
                type: 'number',
            }}
        />

        <FieldWrapper name="opens_at" label="Data de abertura">
            <div className="flex flex-col items-stretch w-full px-2 pb-4">
                <DateTimePicker
                    name="opens_at"
                    ampm={true}
                    format="d 'de' MMMM 'às' HH:mm:ss"
                    disablePast
                    value={opensAt}
                    onChange={(date) => setOpensAt(date as Date)}
                />
            </div>
        </FieldWrapper>

        <FieldWrapper name="closes_at" label="Data de fechamento">
            <div className="flex flex-col items-stretch w-full px-2 pb-4">
                <DateTimePicker
                    name="closes_at"
                    ampm={true}
                    format="d 'de' MMMM 'às' HH:mm:ss"
                    disablePast
                    value={closesAt}
                    onChange={(date) => setClosesAt(date as Date)}
                />
            </div>
        </FieldWrapper>

        <FieldWrapper name="delivers_at" label="Data de entrega">
            <div className="flex flex-col items-stretch w-full px-2 pb-4">
                <DateTimePicker
                    name="delivers_at"
                    ampm={true}
                    format="d 'de' MMMM 'às' HH:mm:ss"
                    disablePast
                    value={deliversAt}
                    onChange={(date) => setDeliversAt(date as Date)}
                />
            </div>
        </FieldWrapper>

        <Button loading={loading}>
            {action}
        </Button>
    </form>
};
