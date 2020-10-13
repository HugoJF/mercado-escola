// tailwind.config.js
module.exports = {
    purge: [],
    theme: {
        extend: {
            boxShadow: {
                menu: '0 -4px 6px -1px rgba(0, 0, 0, 0.02), 0 -2px 4px -1px rgba(0, 0, 0, 0.02)',
            },
            colors: {
                black: '#0A0A0A',

                red: {
                    100: '#FDEDEA',
                    200: '#F9D2CB',
                    300: '#FEA292',
                    400: '#F7725B',
                    500: '#E55D45',
                    600: '#BF331A',
                    700: '#93220E',
                    800: '#69180A',
                    900: '#431108',
                },

                gray: {
                    100: '#F1F1F1',
                    200: '#E8E8E8',
                    300: '#BFBFBF',
                    400: '#9E9E9E',
                    500: '#7A7A7A',
                    600: '#595959',
                    700: '#363636',
                    800: '#1F1F1F',
                    900: '#0F0F0F',
                },

                primary: {
                    100: '#ECF8F6',
                    200: '#BCF5EB',
                    300: '#72DECB',
                    400: '#37AE99',
                    500: '#198D79',
                    600: '#1B7262',
                    700: '#155B50',
                    800: '#123D35',
                    900: '#0E2A25',
                },

                secondary: {
                    100: '#FEEFE4',
                    200: '#FCCAA7',
                    300: '#FBB07B',
                    400: '#FAA365',
                    500: '#F69651',
                    600: '#E9731F',
                    700: '#D96A1A',
                    800: '#B5530C',
                    900: '#853F0D',
                },
            }
        },
    },
    variants: {
        borderWidth: ['responsive', 'hover', 'focus', 'last'],
    },
    plugins: [],
}
