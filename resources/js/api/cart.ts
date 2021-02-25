import {bxios}    from "../bxios";
import {CartType} from "../types/cart";

// adicionar produtos
// atualizar api de adicionar produtos para permitir quantidades
// validar se produto esta na opening
// validar endereco
// remover produtos
// remover produtos da tela do carrinho
// finalizar o pedido
// atualizar a selecao de enderecos
// validar adicao de produtos

export const cart = {
    index: () => bxios()
        .get('cart')
        .send<CartType>(),
    updateAddress: (addressId: Id|null) => bxios()
        .patch('cart', 'address')
        .body({address_id: addressId})
        .send<CartType>(),
    addProduct: (id: Id) => bxios()
        .post('cart', id)
        .send<CartType>(),
    removeProduct: (id: Id) => bxios()
        .delete('cart', id)
        .send<CartType>(),
};
