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
        // High-fashion deep velvet dark black/plum
        night: {
          950: "#070409",
          900: "#0A060E",
          850: "#100B16",
          800: "#17101F",
          750: "#20172B",
        },
        // Restrained warm rose & dusty rose gold
        rose: {
          50: "#FFF5F7",
          100: "#FBE4EB",
          200: "#F2BAC3",
          300: "#E8B4B8",
          400: "#D48B96",
          500: "#B86B77",
          600: "#964C58",
        },
        // Muted vintage lavender
        lavender: {
          100: "#F5EEFF",
          200: "#DBC4F0",
          300: "#C4B5FD",
          400: "#9F85E0",
        },
        // Warm alabaster cream text
        cream: {
          50: "#FFFFFF",
          100: "#FFFBF7",
          200: "#F7F0E6",
          300: "#EAE0D1",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      boxShadow: {
        "editorial": "0 20px 60px rgba(0, 0, 0, 0.6)",
        "subtle-glow": "0 0 40px rgba(232, 180, 184, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
