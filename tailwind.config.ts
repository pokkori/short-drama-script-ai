import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0D1117",
        "bg-secondary": "#1a1a2e",
        accent: "#FF6B6B",
        "accent-light": "#FF8E8E",
        "accent-pink": "#FF6BAE",
        "accent-purple": "#9B59B6",
        gold: "#FFD700",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "pulse-slow": "pulse 3s infinite",
        typewriter: "typewriter 0.05s steps(1) infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
