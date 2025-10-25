import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F89520',
          dark: '#E07A0C',
          light: '#FFA940',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
        }
      },
    },
  },
  plugins: [],
};
export default config;
