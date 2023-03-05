const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#E9C376',
				secondary: '#DFB8AC'
			}
		},
		backgroundImage: {
			brick: 'url(/brick.jpg)'
		},
		fontFamily: {
			serif: ['Mirage', 'serif'],
			fancy: ['BrittanySignature', 'serif'],
			sans: ['Nunito', 'sans-serif']
		}
	},

	plugins: []
};

module.exports = config;
