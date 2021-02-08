import React, {useState} from "react";
import {LazyLoadImage}   from "./Image";
import classNames        from "classnames";
import useTimeout        from "use-timeout";

export type ImageHolderProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const ImageHolder: React.FC<ImageHolderProps> = ({src}) => {
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false);

    /*
        This timeout is used to give React enough time to mount the image
        with 0 opacity, so we can change it to 100% and give it a transition.
        Any duration above 1 should be enough to cause the update to be executed
        in another render (thus allowing the transition to happen).
     */
    useTimeout(() => {
        setVisible(true);
    }, loaded ? 10 : null);

    return <div className="relative pb-3/5">
        <div className="absolute w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg animate-pulse"/>

        {!src && <div className="absolute w-full h-full flex items-center justify-center">
            <p className="text-lg text-center text-gray-400 font-medium tracking-wide">Sem imagem</p>
        </div>}

        {src && <LazyLoadImage
            onLoad={() => setLoaded(true)}
            src={src}
            fallback={<></>}
            NativeImgProps={{
                className: classNames("transition-all duration-150 absolute w-full h-full mb-4 rounded-lg shadow-md object-cover", {
                    'opacity-0': !visible,
                    'opacity-100': visible,
                })
            }}
        />}
    </div>
};
