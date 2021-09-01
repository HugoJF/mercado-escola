const mix = require('laravel-mix');
const path = require('path');
const tsconfig = require('./tsconfig.json');

const paths = tsconfig.compilerOptions.paths;
const aliases = Object.entries(paths).reduce((acc, entry) => {
    const [key, value] = entry;

    // Remove wildcards
    const cleanKey = key.replace('/*', '');
    const cleanValue = value[0].replace('/*', '').replace('*', '');

    // Build path to alias
    acc[cleanKey] = path.resolve(__dirname, 'resources/js', cleanValue);

    return acc;
}, {})

console.log('Alises generated from tsconfig.json', aliases);

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
    .ts('resources/js/app.tsx', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        require('tailwindcss'),
        require('postcss-100vh-fix'),
        require('postcss-viewport-height-correction'),
        require('postcss-hover-media-feature'),
    ])
    .webpackConfig({
        resolve: {
            alias: {
                'react-dom': '@hot-loader/react-dom',
                ...aliases,
            }
        }
    })
    .sourceMaps();

if (mix.inProduction()) {
    mix.version();
}
