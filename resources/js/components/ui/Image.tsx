import React from "react";
import {useInView} from "react-intersection-observer";
import {Image} from "react-shimmer";
import {ImageProps} from "react-shimmer/dist/Image";

// Wrapper component around react-shimmer to support
// lazy-loading. (When user scrolls into to the image, it starts loading.)
// Ping me on github.com/gokcan/react-shimmer repo,
// if you want this functionality directly on react-shimmer package.
export const LazyLoadImage = (props: ImageProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0
    });

    return (
        <div ref={ref} data-inview={inView}>
            {inView && <Image {...props} />}
        </div>
    );
};
