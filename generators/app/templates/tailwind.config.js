const pkg = require('./package.json');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: pkg.paths.purgeFiles,
    safelist: [],
    theme: {
        extend: {
            inset: {
                '1/2': '50%',
            },

            maxWidth: {
                'regular': '1360px',
                'narrow': '680px',
                'wide': '2040px',
                '100': '100px',
                '200': '200px',
                '300': '300px',
                '400': '400px',
                '500': '500px',
                '600': '600px',
                '700': '700px',
                '800': '800px',
                '900': '900px',
                'none': 'none',
            },
        },

        screens: {
            'xsm' : '321px',
            'sm'  : '551px',
            'md'  : '769px',
            'lg'  : '1025px',
            'xl' : '1441px',
            'xxl': '1921px',

            'mobile-nav-max' : {'max': '1024px'}
        },

        spacing: {
            '4:3': '75%',
            '16:9': '56.25%',
            '1/2': '50%',
            'full': '100%',
            '0'  : '0',
            '1px' : '1px',
            '2px' : '2px',
            '5px' : '5px',
            '10px' : '10px',
            'p25': '0.25rem',
            'p5' : '0.5rem',
            'p65': '0.65rem',
            'p75': '0.75rem',
            '1'  : '1rem',
            '1p25': '1.25rem',
            '1p5': '1.5rem',
            '2'  : '2rem',
            '3'  : '3rem',
            '4'  : '4rem',
            '6'  : '6rem',
            '8'  : '8rem',
            '10' : '10rem',
            '16' : '16rem',
            '24' : '24rem',
            '32' : '32rem',
            '64' : '64rem'
        },

        fontFamily: {
            'body': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
            'heading': ['Georgia', 'Times', 'Times New Roman', 'serif'],
        },

        colors: {
            primary: colors.indigo,
            secondary: colors.amber,
            gray: colors.coolGray,
            black: '#333333',
        },

        fontSize: {
            '15px': '15px',
            'p65' : '.65rem',
            'p75' : '.75rem',
            'p875' : '.875rem',
            '1'  : '1rem',
            '1p2': '1.2rem',
            '1p4': '1.4rem',
            '1p6': '1.6rem',
            '1p8': '1.8rem',
            '2'  : '2rem',
            '2p4': '2.4rem',
            '3'  : '3rem',
            '3p2': '3.2rem',
            '4'  : '4rem',
            '5'  : '5rem',
            '6'  : '6rem',
            '7'  : '7rem',
            '8'  : '8rem',
            '9'  : '9rem',
            '10'  : '10rem',
        },
        translate: {
            '0': '0',
            '1px': '1px',
            '-1px': '-1px',
            '2px': '2px',
            '-2px': '-2px',
            '5px': '5px',
            '-5px': '-5px',
            '10px': '10px',
            '-10px': '-10px',
            'p5': '0.5rem',
            '-p5': '-0.5rem',
            '1': '1rem',
            '-1': '-1rem',
            '2': '2rem',
            '-2': '-2rem',
            '4': '4rem',
            '-4': '-4rem',
            '8': '8rem',
            '-8': '-8rem',
            '16': '16rem',
            '-16': '-16rem',
            '32': '32rem',
            '-32': '-32rem',
            '1/2': '50%',
            '-1/2': '-50%',
            'full': '100%',
            '-full': '-100%'
        },
    },
    variants: {
        translate: ['responsive', 'hover', 'group-hover'],
    },
    plugins: [
    ]
}
