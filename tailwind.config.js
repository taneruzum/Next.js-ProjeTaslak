
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        rootBackground: '#ffffff',

        dark1: '#1a1a1a',
        dark2: '#333333',

        purp: '#6300ff',
        gold1: '#FFE002',
        gold2: '#FFB606',
        amber: '#ff7e00',

        //ExamplePalette
        customDark: '#121212',
        customDark2: '#2A2A2A',
        customGold: '#ffc107',

      },
      screens: {
        'xs': '400px',
        //sm min 640px
        //2xl min 1536px
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
  darkMode: "class",
}
