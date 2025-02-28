const colors = require('./src/styles/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        normal: colors.normal,
        light: colors.light,
        lighter: colors.lighter,
        dark: colors.dark,
        darker: colors.darker,
        danger: colors.danger,
        success: colors.success,
        warning: colors.warning,
        bluebg: colors.bluebg,
        greybg: colors.greybg
      },
    },
  },
  plugins: [],
}

