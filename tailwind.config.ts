const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50:  'hsl(243 75% 95%)',
          100: 'hsl(243 75% 90%)',
          200: 'hsl(243 75% 80%)',
          300: 'hsl(243 75% 70%)',
          400: 'hsl(243 75% 60%)',
          500: 'hsl(243 75% 59%)',
          600: 'hsl(243 75% 50%)',
          700: 'hsl(243 75% 40%)',
          800: 'hsl(243 75% 30%)',
          900: 'hsl(243 75% 20%)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        success: { DEFAULT: 'hsl(var(--success))', foreground: '0 0% 100%' },
        warning: { DEFAULT: 'hsl(var(--warning))', foreground: '0 0% 100%' },
        info:    { DEFAULT: 'hsl(var(--info))',    foreground: '0 0% 100%' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xs: 'calc(var(--radius) - 6px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        heading: ['var(--font-sora)', ...fontFamily.sans],
        mono: ['var(--font-jetbrains)', ...fontFamily.mono],
      },
      fontSize: {
        'fluid-xs':   ['var(--text-xs)',   { lineHeight: 'var(--leading-normal)' }],
        'fluid-sm':   ['var(--text-sm)',   { lineHeight: 'var(--leading-normal)' }],
        'fluid-base': ['var(--text-base)', { lineHeight: 'var(--leading-relaxed)' }],
        'fluid-lg':   ['var(--text-lg)',   { lineHeight: 'var(--leading-normal)' }],
        'fluid-xl':   ['var(--text-xl)',   { lineHeight: 'var(--leading-snug)' }],
        'fluid-2xl':  ['var(--text-2xl)',  { lineHeight: 'var(--leading-snug)' }],
        'fluid-3xl':  ['var(--text-3xl)',  { lineHeight: 'var(--leading-tight)' }],
        'fluid-4xl':  ['var(--text-4xl)',  { lineHeight: 'var(--leading-tight)' }],
        'fluid-5xl':  ['var(--text-5xl)',  { lineHeight: 'var(--leading-tight)' }],
        'fluid-6xl':  ['var(--text-6xl)',  { lineHeight: 'var(--leading-tight)' }],
        'fluid-7xl':  ['var(--text-7xl)',  { lineHeight: 'var(--leading-tight)' }],
        'display-xl': ['clamp(3.5rem, 3rem + 4vw, 5rem)',      { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.6rem, 2rem + 3vw, 3.75rem)',   { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2.2rem, 1.8rem + 2vw, 3rem)',    { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.9rem, 1.6rem + 1.5vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        tighter: 'var(--tracking-tight)',
        tight:   'var(--tracking-snug)',
        normal:  'var(--tracking-normal)',
        wide:    'var(--tracking-wide)',
        wider:   'var(--tracking-wider)',
      },
      lineHeight: {
        tight:   'var(--leading-tight)',
        snug:    'var(--leading-snug)',
        normal:  'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'fade-in':  { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        'slide-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to:   { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to:   { transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to:   { transform: 'scale(1)',    opacity: '1' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.15)' },
          '50%':      { boxShadow: '0 0 40px hsl(var(--primary) / 0.35)' },
        },
      },
      animation: {
        'accordion-down':       'accordion-down 0.2s ease-out',
        'accordion-up':         'accordion-up 0.2s ease-out',
        'fade-in':              'fade-in 0.3s ease-out',
        'fade-out':             'fade-out 0.3s ease-out',
        'slide-in-from-top':    'slide-in-from-top 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'scale-in':             'scale-in 0.2s ease-out',
        shimmer:                'shimmer 2s infinite',
        float:                  'float 6s ease-in-out infinite',
        'spin-slow':            'spin-slow 8s linear infinite',
        'marquee':              'marquee 30s linear infinite',
        'pulse-glow':           'pulse-glow 3s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-sm':    '0 0 20px hsl(var(--primary) / 0.15)',
        'glow-md':    '0 0 30px hsl(var(--primary) / 0.2)',
        'glow-lg':    '0 0 50px hsl(var(--primary) / 0.25)',
        'glow-accent':'0 0 30px hsl(var(--accent) / 0.2)',
        'inner-glow': 'inset 0 0 20px hsl(var(--primary) / 0.1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
