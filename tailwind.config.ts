import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#E62727',
          foreground: '#FFFFFF',
          '50': '#FEF2F2',
          '100': '#FEE2E2',
          '200': '#FECACA',
          '300': '#FCA5A5',
          '400': '#F87171',
          '500': '#E62727',
          '600': '#DC2626',
          '700': '#B91C1C',
          '800': '#991B1B',
          '900': '#7F1D1D'
        },
        secondary: {
          DEFAULT: '#3674B5',
          foreground: '#FFFFFF',
          '50': '#EFF6FF',
          '100': '#DBEAFE',
          '200': '#BFDBFE',
          '300': '#93C5FD',
          '400': '#60A5FA',
          '500': '#3674B5',
          '600': '#2563EB',
          '700': '#1D4ED8',
          '800': '#1E40AF',
          '900': '#1E3A8A'
        },
        'secondary-alt': {
          DEFAULT: '#578FCA',
          foreground: '#FFFFFF',
          '50': '#F0F6FF',
          '100': '#E0EFFE',
          '200': '#C7E2FD',
          '300': '#A3CEFC',
          '400': '#578FCA',
          '500': '#578FCA',
          '600': '#3B7BD4',
          '700': '#2563EB',
          '800': '#1D4ED8',
          '900': '#1E40AF'
        },
        lavender: {
          DEFAULT: '#E6E6FA',
          '50': '#FAFAFF',
          '100': '#F3F3FE',
          '200': '#E6E6FA',
          '300': '#DDD6FE',
          '400': '#C4B5FD',
          '500': '#A78BFA',
          '600': '#8B5CF6',
          '700': '#7C3AED',
          '800': '#6D28D9',
          '900': '#5B21B6'
        },
        mint: {
          DEFAULT: '#F0FDF4',
          '50': '#F0FDF4',
          '100': '#DCFCE7',
          '200': '#BBF7D0',
          '300': '#86EFAC',
          '400': '#4ADE80',
          '500': '#22C55E',
          '600': '#16A34A',
          '700': '#15803D',
          '800': '#166534',
          '900': '#14532D'
        },
        peach: {
          DEFAULT: '#FFF7ED',
          '50': '#FFF7ED',
          '100': '#FFEDD5',
          '200': '#FED7AA',
          '300': '#FDBA74',
          '400': '#FB923C',
          '500': '#F97316',
          '600': '#EA580C',
          '700': '#C2410C',
          '800': '#9A3412',
          '900': '#7C2D12'
        },
        slate: {
          DEFAULT: '#F8FAFC',
          '50': '#F8FAFC',
          '100': '#F1F5F9',
          '200': '#E2E8F0',
          '300': '#CBD5E1',
          '400': '#94A3B8',
          '500': '#64748B',
          '600': '#475569',
          '700': '#334155',
          '800': '#1E293B',
          '900': '#0F172A'
        },
        tertiary: {
          DEFAULT: '#205781',
          '50': '#F0F8FF',
          '100': '#E0F2FE',
          '200': '#BAE6FD',
          '300': '#7DD3FC',
          '400': '#38BDF8',
          '500': '#205781',
          '600': '#1E4A73',
          '700': '#1B3D65',
          '800': '#173057',
          '900': '#142349'
        },
        quaternary: {
          DEFAULT: '#4F959D',
          '50': '#F0FDFA',
          '100': '#CCFBF1',
          '200': '#99F6E4',
          '300': '#5EEAD4',
          '400': '#2DD4BF',
          '500': '#4F959D',
          '600': '#0D9488',
          '700': '#0F766E',
          '800': '#115E59',
          '900': '#134E4A'
        },
        soft: {
          DEFAULT: '#98D2C0',
          '50': '#F0FDF4',
          '100': '#DCFCE7',
          '200': '#BBF7D0',
          '300': '#86EFAC',
          '400': '#4ADE80',
          '500': '#98D2C0',
          '600': '#22C55E',
          '700': '#16A34A',
          '800': '#15803D',
          '900': '#166534'
        },
        cream: {
          DEFAULT: '#F6F8D5',
          '50': '#FEFCE8',
          '100': '#FEF3C7',
          '200': '#FDE68A',
          '300': '#FCD34D',
          '400': '#FBBF24',
          '500': '#F6F8D5',
          '600': '#D97706',
          '700': '#B45309',
          '800': '#92400E',
          '900': '#78350F'
        },
        accent: {
          DEFAULT: '#F3F2EC',
          foreground: '#334155',
          '50': '#FEFEFE',
          '100': '#F3F2EC',
          '200': '#E8E6E0',
          '300': '#DDD9D3',
          '400': '#D2CCC6',
          '500': '#C7BFB9',
          '600': '#A8A097',
          '700': '#898175',
          '800': '#6A6253',
          '900': '#4B4331'
        },
        warm: {
          DEFAULT: '#DCDCDC',
          foreground: '#4A4A4A',
          '50': '#FAFAFA',
          '100': '#F5F5F5',
          '200': '#EEEEEE',
          '300': '#E0E0E0',
          '400': '#DCDCDC',
          '500': '#BDBDBD',
          '600': '#9E9E9E',
          '700': '#757575',
          '800': '#616161',
          '900': '#424242'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.8'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-5px)'
          }
        },
        'spin-slow': {
          to: {
            transform: 'rotate(360deg)'
          }
        },
        'spin-slower': {
          to: {
            transform: 'rotate(360deg)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-slow': 'pulse-slow 3s infinite',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'spin-slower': 'spin-slower 32s linear infinite'
      }
    }
  },
  plugins: [tailwindcssAnimate]
}

export default config

