import React, {RefObject, useEffect, useRef, useState} from 'react';
import AnimateHeight                                   from "react-animate-height";

export const HeightTransitioner: React.FC = ({children}) => {
    const ref = useRef<HTMLDivElement>();
    const [height, setHeight] = useState<string | number>('auto');
    const [windowSize, setWindowSize] = useState<[number, number] | null>(null);

    useEffect(() => {
        function handleResize() {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.scrollHeight);
        } else {
            setHeight('auto');
        }
    }, [children, windowSize]);

    return (
        <AnimateHeight height={height}>
            <div ref={ref as RefObject<HTMLDivElement>}>
                {children}
            </div>
        </AnimateHeight>
    );
};
