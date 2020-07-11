module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        'p4-yellow': {
          '500': '#FEF600',
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
