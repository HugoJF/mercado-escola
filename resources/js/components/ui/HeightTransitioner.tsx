import React, {RefObject, useEffect, useRef, useState} from 'react';
import AnimateHeight                                   from "react-animate-height";

interface HeightTransitionerProps {
    useFix?: boolean,
    dependencies?: any[],
}

export const HeightTransitioner: React.FC<HeightTransitionerProps> =
    ({useFix = false, dependencies = [], children}) => {
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
                const {scrollHeight} = ref.current;
                // Avoid setting height of 0 at all costs. This will cause AnimateHeight
                // to set a display: none style and break the element height measuring
                // method this component is using.
                if (scrollHeight === 0 && useFix) {
                    setHeight(1);
                } else {
                    setHeight(ref.current.scrollHeight);
                }
            } else {
                setHeight('auto');
            }
        }, [children, windowSize, ...dependencies]);

        return (
            <AnimateHeight height={height}>
                <div data-mark="pog" ref={ref as RefObject<HTMLDivElement>}>
                    {children}
                </div>
            </AnimateHeight>
        );
    };
