/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				header: ["Changa One"],
				body: ["Poppins", "sans-serif"],
			},
			textColor: {
				primary: "#151618",
				secondary: "#0085FF",
				lg: "#5B5B5B",
				blue: "#0085FF",
			},
			screens: {
				xxxsm: "260px",
				xxsm: "320px",
				xsm: "412px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				txl: "1536px",
			},
			backgroundColor: {
				primary: "#151618",
				secondary: "#1F1F1F",
				blue: "#0085FF",
			},
			width: {
				extrafull: "100%",
			},
			height: {
				extrafull: "130%",
				card: "390px",
			},
			spacing: {
				mr: "80px",
			},
		},
	},
	plugins: [],
};
