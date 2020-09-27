// window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

// try {
//     window.Popper = require('popper.js').default;
//     window.$ = window.jQuery = require('jquery');
//
//     require('bootstrap');
//     console.log('Popper.JS, jQuery and Bootstrap loaded!');
// } catch (e) {
//     console.error(e);
// }

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

console.log('Axios setup finished');

async function test() {
    let response = await axios.get('/sanctum/csrf-cookie');
    console.log('CSRF', response);

    let logged = false;

    let me = await axios.get('/me');
    console.log('Me', me);

    if (me.data.user) {
        logged = true;
    }

    if (!logged) {
        try {
            let registration = await axios.post('/register', {
                name: 'Hugo',
                email: 'hugo_jeller@hotmail.com',
                password: '123123123',
                password_confirmation: '123123123',
            });
            console.log('Registration', registration);
        } catch (e) {
            let login = await axios.post('/login', {
                email: 'hugo_jeller@hotmail.com',
                password: '123123123',
            });
            console.log('Login', login);
        }
    }

    let p = await axios.get('/protected');
    console.log('Protected after', p)
}

test();

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';
//
// window.Pusher = require('pusher-js');
//
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
