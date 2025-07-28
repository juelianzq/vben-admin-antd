import path from 'node:path';
import { getPackagesSync } from '@manypkg/get-packages';
import typographyPlugin from '@tailwindcss/typography';

const { packages } = getPackagesSync(process.cwd());
const tailwindPackages = [];

packages.forEach((pkg) => {
  tailwindPackages.push(pkg.dir);
});

// 创建颜色调色板
function createColorsPalette(name) {
  return {
    50: `hsl(var(--${name}-50))`,
    100: `hsl(var(--${name}-100))`,
    200: `hsl(var(--${name}-200))`,
    300: `hsl(var(--${name}-300))`,
    400: `hsl(var(--${name}-400))`,
    500: `hsl(var(--${name}-500))`,
    600: `hsl(var(--${name}-600))`,
    700: `hsl(var(--${name}-700))`,
    active: `hsl(var(--${name}-700))`,
    'background-light': `hsl(var(--${name}-200))`,
    'background-lighter': `hsl(var(--${name}-100))`,
    'background-lightest': `hsl(var(--${name}-50))`,
    border: `hsl(var(--${name}-400))`,
    'border-light': `hsl(var(--${name}-300))`,
    foreground: `hsl(var(--${name}-foreground))`,
    hover: `hsl(var(--${name}-600))`,
    text: `hsl(var(--${name}-500))`,
    'text-active': `hsl(var(--${name}-700))`,
    'text-hover': `hsl(var(--${name}-600))`,
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    ...tailwindPackages.map((item) =>
      path.join(item, 'src/**/*.{vue,js,ts,jsx,tsx,svelte,astro,html}'),
    ),
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        'background-deep': 'hsl(var(--background-deep))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          ...createColorsPalette('primary'),
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          ...createColorsPalette('destructive'),
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          ...createColorsPalette('success'),
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          ...createColorsPalette('warning'),
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          hover: 'hsl(var(--accent-hover))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          deep: 'hsl(var(--sidebar-deep))',
        },
        header: 'hsl(var(--header))',
        heavy: {
          DEFAULT: 'hsl(var(--heavy))',
          foreground: 'hsl(var(--heavy-foreground))',
        },
        overlay: {
          DEFAULT: 'hsl(var(--overlay))',
          content: 'hsl(var(--overlay-content))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-family)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [typographyPlugin],
}