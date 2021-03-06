const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    // .js('resources/js/bootstrap.js', 'public/js')
    .ts('resources/js/app.tsx', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        tailwindcss('./tailwind.config.js'),
        require('postcss-100vh-fix'),
        require('postcss-viewport-height-correction'),
        require('postcss-hover-media-feature'),
    ])
    .webpackConfig({
        resolve: {
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
        }
    })
    .sourceMaps();

if (mix.inProduction()) {
    mix.version();
}
