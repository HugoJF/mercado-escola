import React from "react";

type ImageAttributes = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const ImageHolder: React.FC<ImageAttributes> = ({children, src, ...rest}) => {
    return <div className="relative pb-3/5">
        <div className="absolute w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg animate-pulse"/>

        {!src && <div className="absolute w-full h-full flex items-center justify-center">
            <p className="text-lg text-center text-gray-400 font-medium tracking-wide">Sem imagem</p>
        </div>}

        {src && <img
            {...rest}
            src={src}
            className="absolute w-full h-full mb-4 rounded-lg shadow-md object-cover"
        />}
    </div>
};
