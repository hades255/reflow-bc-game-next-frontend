import type { Config } from "tailwindcss";

const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundImage: {
      gold: "linear-gradient(var(--gold-grad-start),var(--gold-grad-end))",
      disabled: "linear-gradient(var(--dis-grad-start),var(--dis-grad-end))",
      shine: "radial-gradient(var(--shine-grad-start),var(--shine-grad-end))"
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      main: "#202020",
      innerBlack: "#0D0D0D",
      font: "#714A04",
      brown: "#50350B",
      gold: "#E9AE15"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
