import plugin from 'tailwindcss/plugin';
import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/styles/index.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tight-2': '-0.02em',
      },
      colors: {
        primary: {
          50: '#FDEBED',
          100: '#F8C4CA',
          200: '#F39CA7',
          300: '#F18995',
          400: '#EF7584',
          500: '#ED6172',
          600: '#EA4E61',
          700: '#E83A4F',
          800: '#D62845',
          900: '#971A36',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          50: '#BEFFF1',
          100: '#63EED6',
          200: '#1BD5B9',
          300: '#18BAA5',
          400: '#16A696',
          500: '#139386',
          600: '#12857F',
          700: '#107573',
          800: '#0D6161',
          900: '#094345',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        gray: {
          50: '#FAFAFA',
          100: '#EFEFEF',
          200: '#EAEAEA',
          300: '#DBDBDB',
          400: '#BDBDBD',
          500: '#999999',
          600: '#666666',
          700: '#424242',
          800: '#222222',
          900: '#121212',
        },
      },
      fontSize: {
        'title-xl': [
          '1.5rem',
          {
            lineHeight: '34px',
            letterSpacing: '-0.02em',
          },
        ],
        'title-l': [
          '1.25rem',
          {
            lineHeight: '30px',
            letterSpacing: '-0.02em',
          },
        ],
        'title-m': [
          '1.125rem',
          {
            lineHeight: '27px',
            letterSpacing: '-0.02em',
          },
        ],
        'body-m': [
          '1rem',
          {
            lineHeight: '24px',
            letterSpacing: '-0.02em',
          },
        ],
        'body-s': [
          '0.875rem',
          {
            lineHeight: '21px',
            letterSpacing: '-0.02em',
          },
        ],
        'label-s': [
          '0.75rem',
          {
            lineHeight: '17px',
            letterSpacing: '-0.02em',
          },
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      const getFF = () => {
        const v = theme('fontFamily.sans');
        return Array.isArray(v) ? v.join(', ') : String(v);
      };

      const resolveFont = (key) => {
        const v = theme(`fontSize.${key}`);
        if (Array.isArray(v)) {
          // ['1.5rem', { lineHeight, letterSpacing, ... }]
          return { size: v[0], opts: v[1] ?? {} };
        }
        if (v && typeof v === 'object') {
          // { fontSize: '1.5rem', lineHeight, letterSpacing, ... }
          const { fontSize, lineHeight, letterSpacing } = v;
          return { size: fontSize, opts: { lineHeight, letterSpacing } };
        }
        // '1.5rem' 같은 문자열
        return { size: String(v), opts: {} };
      };

      const mk = (className, weight, key) => {
        const { size, opts } = resolveFont(key);
        const style = {
          fontFamily: getFF(),
          fontSize: size,
          fontWeight: theme(`fontWeight.${weight}`),
        };
        if (opts.lineHeight) style.lineHeight = opts.lineHeight;
        if (opts.letterSpacing) style.letterSpacing = opts.letterSpacing;
        return { [`.${className}`]: style };
      };

      addComponents({
        ...mk('typo-title-xl-bold', 'bold', 'title-xl'),
        ...mk('typo-title-l-bold', 'bold', 'title-l'),
        ...mk('typo-title-l-medium', 'medium', 'title-l'),
        ...mk('typo-title-m-bold', 'bold', 'title-m'),
        ...mk('typo-title-m-medium', 'medium', 'title-m'),
        ...mk('typo-body-m-bold', 'bold', 'body-m'),
        ...mk('typo-body-m-medium', 'medium', 'body-m'),
        ...mk('typo-body-s-bold', 'bold', 'body-s'),
        ...mk('typo-body-s-medium', 'medium', 'body-s'),
        ...mk('typo-label-s-bold', 'bold', 'label-s'),
        ...mk('typo-label-s-medium', 'medium', 'label-s'),
      });
    }),
    tailwindcssAnimate,
  ],
};
