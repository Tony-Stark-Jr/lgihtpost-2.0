function withOpacity(variableName) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}),${opacityValue})`;
		}
		return `rgb(var(${variableName}))`;
	};
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
		extend: {
			textColor: {
				skin: {
					base: withOpacity('--color-text-base'),
					muted: withOpacity('--color-text-muted'),
					// inverted: "var(--color-text-inverted)",
					accent: withOpacity('--color-accent'),
					'button-base': withOpacity('--color-button-text-base'),
				},
			},
			backgroundColor: {
				skin: {
					base: withOpacity('--color-bg-base'),
					muted: withOpacity('--color-bg-muted'),
					'button-base': withOpacity('--color-button-base'),
					'button-base-hover': withOpacity('--color-button-base-hover'),
					// "button-muted": "var(--color-button-muted)",
					// "button-muted-hover": "var(--color-button-muted-hover)",
				},
			},
			buttonColor: {},
			// fontFamily: {
			//   montserrat: ['Montserrat', 'sans-serif']
			// }
		},
	},
	plugins: [],
};
