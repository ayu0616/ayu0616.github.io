import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,jsx,tsx,mdx}'],
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                '.drag-none': {
                    '-khtml-user-drag': 'none',
                    '-moz-user-drag': 'none',
                    '-o-user-drag': 'none',
                    '-webkit-user-drag': 'none',
                    'user-drag': 'none',
                },
            })
        }),
    ],
    theme: {
        extend: {},
    },
}
