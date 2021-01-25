import React          from "react";
import {AnimationBox} from "./AnimationBox";

type ButtonColors = 'default' | 'primary' | 'secondary' | 'danger';

export type ButtonProps = {
    color?: ButtonColors;
    checked?: boolean;
    onToggle: () => void;
}

const classes: { [id in ButtonColors]: (params: ButtonProps) => string } = {
    default: () => '',
    primary: () => 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: () => 'bg-secondary-500 hover:bg-secondary-600 text-white',
    danger: () => ''
};

export const Toggle: React.FC<ButtonProps> = (props) => {
    const {checked = false, color = 'primary', onToggle} = props;

    return <div
        onClick={onToggle}
        className={`duration-100 relative flex ${
            checked ? 'justify-end' : 'justify-start'
        } w-16 h-8 ${
            checked ? 'bg-green-500' : 'bg-gray-300'
        } rounded-full cursor-pointer`}
    >
        <AnimationBox dependencies={[checked]}>
            {({target, props}) => (
                <>
                    <div className="h-8 w-8" ref={target}/>
                    <div className="duration-150 ease-out" {...props}>
                        <div className="p-1 h-8 w-8">
                            <div
                                className={`bg-white h-full border ${
                                    checked ? 'border-green-600' : 'border-gray-400'
                                } shadow-md rounded-full`}
                            />
                        </div>
                    </div>
                </>
            )}
        </AnimationBox>
    </div>
};
