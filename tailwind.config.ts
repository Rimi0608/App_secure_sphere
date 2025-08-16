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
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				emergency: {
					DEFAULT: 'hsl(var(--emergency))',
					foreground: 'hsl(var(--emergency-foreground))',
					light: 'hsl(var(--emergency-light))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					light: 'hsl(var(--warning-light))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					light: 'hsl(var(--success-light))'
				},
				'safe-zone': {
					DEFAULT: 'hsl(var(--safe-zone))',
					foreground: 'hsl(var(--safe-zone-foreground))'
				},
				protected: {
					DEFAULT: 'hsl(var(--protected))',
					foreground: 'hsl(var(--protected-foreground))'
				},
				'gps-active': {
					DEFAULT: 'hsl(var(--gps-active))',
					foreground: 'hsl(var(--gps-active-foreground))'
				},
				battery: {
					normal: 'hsl(var(--battery-normal))',
					low: 'hsl(var(--battery-low))',
					critical: 'hsl(var(--battery-critical))'
				},
				sos: {
					DEFAULT: 'hsl(var(--sos-primary))',
					ring: 'hsl(var(--sos-ring))',
					glow: 'hsl(var(--sos-glow))'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 1s ease-in-out',
				'fade-in': 'fade-in 0.5s ease-out'
			},
			backgroundImage: {
				'gradient-emergency': 'var(--gradient-emergency)',
				'gradient-safe': 'var(--gradient-safe)',
				'gradient-primary': 'var(--gradient-primary)'
			},
			boxShadow: {
				'emergency': 'var(--shadow-emergency)',
				'safe': 'var(--shadow-safe)',
				'primary': 'var(--shadow-primary)',
				'elevated': 'var(--shadow-elevated)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
