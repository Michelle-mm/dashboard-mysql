module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '600px',
      'md_sm': '700px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    },
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      fontSize: {
        14: '14px',
      },
      transitionProperty: {
        'size': 'height, width',
        'width': 'width',
        'height': 'height',
      },
      transitionDuration: {
        '0.4': '400ms',
        '0.6': '600ms',
      },
      animation: {
        'slide-in': 'slideIn 0.4s ease',
        'slide-out': 'slideOut 0.4s ease',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-500px)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-500px)', visibilit: 'hidden' },
        },
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-bg2': '#d8e6e6',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        450: '450px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        '9/10': '90%',
      },
      minHeight: {
        590: '590px',
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '30%',
        '3/5': '60%',
        '10/12': '80%',
        '11/12': '90%',
        '450': '450px',
      },
      minWidth: {
        '1/5.5': '23%',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
      },
      boxShadow: {
        'cus': '0 4px 6px 1px rgba(0, 0, 0, 0.1),  2px 2px 4px 1px #c9c9c9;',
        'cus2': '4px 4px 13px 1.2px rgba(0, 0, 0, 0.2),  -5px -5px 12px 1px #ffffff',
      },
    },
  },
  plugins: [],
};