import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
  "wppresetblack": "#000000",
  "wppresetcyanbluishgray": "#abb8c3",
  "wppresetwhite": "#ffffff",
  "wppresetpalepink": "#f78da7",
  "wppresetvividred": "#cf2e2e",
  "wppresetluminousvividorange": "#ff6900",
  "wppresetluminousvividamber": "#fcb900",
  "wppresetlightgreencyan": "#7bdcb5",
  "wppresetvividgreencyan": "#00d084",
  "wppresetpalecyanblue": "#8ed1fc",
  "wppresetvividcyanblue": "#0693e3",
  "wppresetvividpurple": "#9b51e0"
},
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
