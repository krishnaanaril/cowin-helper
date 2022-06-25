module.exports = {
  content: ['./projects/ch-web/src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')
    , require('@tailwindcss/forms')
    , require('@tailwindcss/line-clamp')
    , require('@tailwindcss/typography')
  ],
};
