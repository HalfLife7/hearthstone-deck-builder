/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const flattenColorPalette = require('tailwindcss/src/util/flattenColorPalette')

const textBorder = plugin(
    function ({matchUtilities, theme, config, e}) {
        const textBorderWidth = `--tw${config('prefix')}-text-border-width`
        const pos = `var(${textBorderWidth},1px)`
        const neg = `calc(var(${textBorderWidth}, 1px) * -1)`

        // https://github.com/tailwindlabs/tailwindcss/discussions/8598#discussioncomment-2932189
        matchUtilities(
            {
                'text-border': (value) => ({
                    'text-shadow': `
            ${pos} ${pos} 0 ${value},
            ${neg} ${neg} 0 ${value},
            ${pos} ${neg} 0 ${value},
            ${neg} ${pos} ${value};
          `,
                }),
            },
            {
                values: flattenColorPalette(theme('colors')),
                type: ['color', 'any'],
            }
        )

        matchUtilities(
            {
                'text-border': (value) => ({
                    [textBorderWidth]: value
                }),
            },
            {values: theme('borderWidth')}
        )
    },
)
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [textBorder]
}