import React, {useEffect, useState} from 'react';
import InputMask, {Props}           from "react-input-mask";

interface NewProps {
    initialValue?: string
}

type PhoneInputProps = Omit<Props & NewProps, keyof { value: any, onChange: any }>

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
        /* @ts-ignore */
        ref={ref}
        {...rest}
    />
});
