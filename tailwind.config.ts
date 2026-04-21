import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0e0e0e",
        "surface-container-low": "#131313",
        "surface-container": "#1a1a1a",
        "surface-container-high": "#20201f",
        "surface-container-highest": "#262626",
        primary: "#f3ffca",
        primary_fixed: "#cafd00",
        primary_dim: "#beee00",
        error_dim: "#d53d18",
        on_primary_fixed: "#000000",
        on_error: "#450900",
        on_surface_variant: "#adaaaa",
        secondary_container: "#474746",
        on_secondary_container: "#d2d0cf",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.02em",
      },
    },
  },
  plugins: [],
};
export default config;
