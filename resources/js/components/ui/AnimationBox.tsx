import React, {useCallback, useEffect, useRef, useState} from 'react';

export type OverlayWrapperProps = {
    dependencies?: any[];
    children: (parameters: {
        target: ReturnType<typeof useCallback>;
        props: Record<string, unknown>;
    }) => any;
}

type OverlayWrapperData = {
    top: number;
    left: number;
    width: number;
    height: number;
}

export const AnimationBox: React.FC<OverlayWrapperProps> = ({dependencies = [], children}) => {
    const ref = useRef<HTMLElement>();
    const [data, setData] = useState<Partial<OverlayWrapperData | null>>(null);

    const target = useCallback((node) => {
        if (!node) {
            return;
        }

        ref.current = node;

        update(node);
    }, []);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        update(ref.current);
    }, dependencies);

    function update(element: HTMLElement) {
        setData({
            left: element.offsetLeft,
            top: element.offsetTop,
            height: element.clientHeight,
            width: element.clientWidth
        });
    }

    // Fixes initial transition from 0,0
    let style;
    if (data) {
        style = {
            left: (data.left) + 'px',
            top: (data.top) + 'px',
            height: (data.height) + 'px',
            width: (data.width) + 'px'
        }
    } else {
        style = {
            display: 'none',
        }
    }

    return children({
        target,
        props: {
            style: {
                position: 'absolute',
                ...style,
            }
        }
    });
};
