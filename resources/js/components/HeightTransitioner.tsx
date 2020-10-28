import React, {RefObject, useEffect, useRef, useState} from 'react';
import AnimateHeight                                   from "react-animate-height";

export const HeightTransitioner: React.FC = ({children}) => {
    const ref = useRef<HTMLDivElement>();
    const [height, setHeight] = useState<string | number>('auto');

    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.scrollHeight);
        } else {
            setHeight('auto');
        }
    }, [children]);

    return (
        <AnimateHeight height={height}>
            <div ref={ref as RefObject<HTMLDivElement>}>
                {children}
            </div>
        </AnimateHeight>
    );
}
