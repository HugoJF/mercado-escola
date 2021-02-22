import React, {useEffect, useState} from 'react';
import InputMask, {Props}           from "react-input-mask";

type KeysToOmit = keyof { value: any, onChange: any };
type NewProps = {
    initialValue?: string;
}

export type PhoneInputProps = Omit<Props & NewProps, KeysToOmit>

export const PhoneInput: React.FC<PhoneInputProps> = React.forwardRef(({initialValue, ...rest}, ref) => {
    const [phone, setPhone] = useState(initialValue ?? '');

    useEffect(() => {
        if (initialValue) {
            setPhone(initialValue);
        }
    }, [initialValue]);

    return <InputMask
        value={phone}
        onChange={(e) => setPhone(e.currentTarget.value)}
        maskPlaceholder=" "
        /* @ts-ignore */
        ref={ref}
        {...rest}
    />
});
