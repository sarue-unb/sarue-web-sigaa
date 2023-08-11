/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				lightGrey: '#2D2F39',
				darkBlue: '#003366',
				darkGrey: '#161A23',
				darkGreen: '#006633',
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	}
}
