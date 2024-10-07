import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    backgroundImage: {
      gold: "linear-gradient(var(--gold-grad-start),var(--gold-grad-end))",
      disabled: "linear-gradient(var(--dis-grad-start),var(--dis-grad-end))",
      shine: "radial-gradient(var(--shine-grad-start),var(--shine-grad-end))",
    },
    colors: {
      transparent: colors.transparent,
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      yellow: colors.yellow,
      gray: colors.gray,
      green: colors.green,
      neutral: colors.neutral,
      teal: colors.teal,
      blue: colors.blue,
      red: colors.red,
      main: "#202020",
      innerBlack: "#0D0D0D",
      font: "#D1D1D1",
      brown: "#50350B",
      gold: "#E9AE15",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        toast: {
          "0%": {
            right: "-32px",
            opacity: "0",
          },
          "20%": {
            right: "32px",
            opacity: "1",
          },
          "80%": {
            right: "32px",
            opacity: "1",
          },
          "100%": {
            right: "-32px",
            opacity: "0",
          },
        },
      },
      animation: {
        "toast-animation": "toast 5s 1",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
export default config;
