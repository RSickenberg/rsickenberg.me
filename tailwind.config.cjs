/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'media',
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,json}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		fontFamily: {
			sans: ['Inter', 'ui-sans-serif'],
			mono: ["Geist\ Mono", 'ui-monospace', 'SFMono-Regular']
		},
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('flowbite/plugin')
	],
}
