/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			lineHeight: {
				'login-14': '14px',
				'login-125': '125%',
			},
			colors: {
				'black-primary': '#181C32',
				'blue-primary': '#00549B',
				'blue-secondary': '#0D5CC6',
				'red-primary': '#D9214E',
				'gray-primary': '#A1A5B7',
				'gray-secondary': '#5E6278',
				'gray-teritary': '#E1E3EA',
			},
			gap: {
				'login-10': '10px',
				'login-11': '11px',
				'login-25': '25px',
			},
			space: {
				'login-25': '25px',
			},
			fontSize: {
				'login-10': '10px',
				'login-13': '13px',
				'login-14': '14px',
				'login-26': '26px',
			},
			height: {
				'login-134': '134px',
			},
			width: {
				'login-324': '324px',
				'login-113': '113px',
				'login-430': '430px',
			},
			letterSpacing: {
				'login-2': '-2%',
			},
			margin: {
				'login-157.5': '157.5px',
			},
			animation: {
				slideInFromLeft: 'slideInFromLeft 2s',
			},
			keyframes: {
				slideInFromLeft: {
					'0%': { transform: 'translateX(30%)' },
					'100%': { transform: 'translateX(0)' },
				},
			},
		},
	},
	variants: {},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.login-bg-cover': {
					backgroundImage: "url('/background-cover.webp')",
					backgroundSize: 'cover',
					opacity: '10%',
				},
			});
		}),
	],
};
