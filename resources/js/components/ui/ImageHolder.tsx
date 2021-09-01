import React from "react";
import {LazyLoadImage} from "./Image";

type DOMProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
type ExtraProps = { base64svg?: string };
export type ImageHolderProps = DOMProps & ExtraProps;

const baseClassName = 'transition-all duration-150 absolute w-full h-full mb-4 rounded-lg shadow-md object-cover opacity-100';

export const ImageHolder: React.FC<ImageHolderProps> = ({src, base64svg, alt}) => {
    return <div className="relative pb-3/5">
        {!src && <div className="absolute w-full h-full flex items-center justify-center">
            <p className="text-lg text-center text-gray-400 font-medium tracking-wide">Sem imagem</p>
        </div>}

        {src && <LazyLoadImage
            src={src}
            fallback={<img
                alt={alt}
                src={base64svg}
                className={baseClassName}
            />}
            NativeImgProps={{className: baseClassName}}
        />}
    </div>
};
