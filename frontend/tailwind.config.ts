import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			background: '#070718',
			surface: 'rgba(255, 255, 255, 0.05)',
			primary: {
				DEFAULT: '#6C63FF',
				glow: 'rgba(108, 99, 255, 0.35)',
			},
			secondary: {
				DEFAULT: '#00D1FF',
			},
			textPrimary: '#EAEAF0',
			danger: '#FF4D6D',
			success: '#00FFA3',
  		},
		backgroundImage: {
			'cyber-gradient': 'linear-gradient(to bottom right, #070718, #0B0B1A)',
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
