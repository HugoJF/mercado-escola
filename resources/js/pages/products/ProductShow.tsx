import React    from 'react';
import {Button} from "../../components/Button";

export const ProductShow: React.FC = () => {
    return <>
        <div className="flex flex-col justify-around min-h-full">
            <div
                style={{background: 'url(https://conteudo.imguol.com.br/c/entretenimento/0e/2017/10/15/batata-crua-1508077604971_v2_1920x1269.jpg) content-box'}}
                className="h-64 w-64 mx-auto bg-gray-300 rounded-full shadow-md bg-cover"
            />

            <div>
                <h2 className="mb-4 text-2xl tracking-wide">Descrição</h2>

                <p className="px-2 text-sm text-gray-500 leading-4">A batata inglesa é fonte importante de fósforo, vitaminas do grupo B, e se destaca como fonte de vitamina C entre os alimentos básicos.</p>
            </div>

            <div className="my-8 flex items-center justify-between">
                <div className="text-3xl text-secondary-500 font-medium">R$ 1,34</div>
                <div className="flex items-center">
                    <div className="transition-colors duration-150
                    pb-1 flex justify-center items-center w-12 h-12
                    hover:bg-gray-200 text-gray-400 text-2xl font-bold
                    border border-gray-300 rounded-lg cursor-pointer"
                    >
                        -
                    </div>
                    <div className="mx-4 text-2xl font-medium">200g</div>
                    <div className="transition-colors duration-150
                    pb-1 flex justify-center items-center w-12 h-12
                    hover:bg-gray-200 text-gray-400 text-2xl font-bold
                    border border-gray-300 rounded-lg cursor-pointer"
                    >
                        +
                    </div>
                </div>
            </div>

            <Button>
                Adicionar ao carrinho
            </Button>
        </div>
    </>

}
