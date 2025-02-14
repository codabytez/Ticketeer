import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#041E23",
          secondary: "#08252B",
        },
        grey: {
          98: "#FAFAFA",
        },
        border: "#0E464F",
      },
      fontFamily: {
        jejuMyeongjo: "var(--font-jejuMyeongjo)",
        roadRage: "var(--font-road-rage)",
        roboto: "var(--font-roboto)",
      },
    },
  },
  plugins: [],
} satisfies Config;
