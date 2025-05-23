
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
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
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
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
				},
        bengal: {
          50: '#f1f8f2',
          100: '#e2f0e5',
          200: '#c5e0ca',
          300: '#97c5a0',
          400: '#6aa676',
          500: '#4a8854',
          600: '#3a6d43',
          700: '#315838',
          800: '#2a4930',
          900: '#243c29',
          950: '#0d1a0f',
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
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-15px)',
          },
        },
        'pulse-soft': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.8',
          },
        },
        'star-float': {
          '0%': {
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translateY(-15px) rotate(180deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(0px) rotate(360deg)',
            opacity: '0.6',
          },
        },
        'star-run-left-to-right': {
          '0%': { left: '-5%', opacity: '0.6' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { left: '105%', opacity: '0.6' }
        },
        'star-run-right-to-left': {
          '0%': { left: '105%', opacity: '0.6' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { left: '-5%', opacity: '0.6' }
        },
        'star-run-top-to-bottom': {
          '0%': { top: '-5%', opacity: '0.6' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '105%', opacity: '0.6' }
        },
        'star-run-bottom-to-top': {
          '0%': { top: '105%', opacity: '0.6' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '-5%', opacity: '0.6' }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'star-float': 'star-float 5s ease-in-out infinite',
        'star-run-left-to-right': 'star-run-left-to-right var(--duration, 15s) linear infinite',
        'star-run-right-to-left': 'star-run-right-to-left var(--duration, 15s) linear infinite',
        'star-run-top-to-bottom': 'star-run-top-to-bottom var(--duration, 15s) linear infinite',
        'star-run-bottom-to-top': 'star-run-bottom-to-top var(--duration, 15s) linear infinite'
			},
      fontFamily: {
        'bengali': ['Noto Serif Bengali', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
