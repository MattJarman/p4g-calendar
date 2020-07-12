module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        'p4-yellow': {
          '500': '#FEF600',
        },
        'dark-pastel-green': {
          '500': '#37BE3A',
          '700': '#2E9E30',
        },
      },
      fontSize: {
        xxs: '.5rem',
      },
    },
    fontFamily: {
      body: ['Nunito', 'sans-serif'],
      display: ['Nunito', 'sans-serif'],
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'active'],
  },
};
