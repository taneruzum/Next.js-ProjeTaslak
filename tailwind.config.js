
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ["var(--font-poppins)"]
      },
      colors: {
        rootBackground: '#ffffff',
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
  darkMode: "selector",
}
