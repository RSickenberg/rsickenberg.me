/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'media',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['Satoshi', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
