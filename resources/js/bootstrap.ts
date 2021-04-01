/**
 * Globally declare axios object
 */
import {AxiosStatic} from "axios";

declare global {
    interface Window {
        axios: AxiosStatic;
    }
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.withCredentials = true;
window.axios.defaults.maxRedirects = 0;

declare global {
    interface Window {
        updateViewportProperty: () => () => void;
    }
}

/**
 * postcss-viewport-height-correction variable updater
 */
window.updateViewportProperty = function () {
    let prevClientHeight: number;

    function handleResize() {
        const clientHeight = document.documentElement.clientHeight;
        if (clientHeight === prevClientHeight) {
            return;
        }

        requestAnimationFrame(function updateViewportHeight() {
            document.documentElement.style.setProperty('--vh', (clientHeight * 0.01) + 'px');
            prevClientHeight = clientHeight;
        });
    }

    handleResize();
    return handleResize;
};

window.addEventListener('resize', window.updateViewportProperty());
window.addEventListener('DOMContentLoaded', window.updateViewportProperty());
