import React from 'react';
import ReactDOM from 'react-dom';

// Estes dois contêineres são irmãos no DOM
const modalRoot = document.getElementById('modal');

export class Portal extends React.Component {
    el: Element;

    constructor(props: any) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // O elemento portal é inserido na árvore DOM depois que
        // os componentes filhos de `Modal` são montados, o que significa que os filhos
        // serão montados em um nó DOM separado. Se um componente
        // filho precisa ser colocado na árvore DOM
        // imediatamente quando é montado, por exemplo para medir um
        // nó DOM ou usar 'autoFocus' em um descendente, adicione
        // state ao Modal e renderize o filho apenas quando o Modal
        // estiver inserido na árvore DOM.
        if (!modalRoot) {
            throw Error('Could not find modal root')
        }

        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        if (!modalRoot) {
            throw Error('Could not find modal root')
        }

        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}
