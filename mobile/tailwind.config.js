/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: 'Nunito_400Regular',
        semibold: 'Nunito_600SemiBold',
        bold: 'Nunito_700Bold',
      },

      lineHeight: {
        short: '140%',
        relaxed: '160%',
      },
    },
  },
  plugins: [],
}
