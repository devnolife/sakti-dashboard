/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#3674B5",
          foreground: "#FFFFFF",
          50: "#EBF2F9",
          100: "#D7E5F3",
          200: "#AFCBE7",
          300: "#87B1DB",
          400: "#5F97CF",
          500: "#3674B5", // Main primary color
          600: "#2E5D91",
          700: "#22466D",
          800: "#172E48",
          900: "#0B1724",
        },
        secondary: {
          DEFAULT: "#578FCA",
          foreground: "#FFFFFF",
          50: "#EEF4FA",
          100: "#DCE9F5",
          200: "#B9D3EB",
          300: "#97BDE1",
          400: "#74A7D7",
          500: "#578FCA", // Main secondary color
          600: "#4672A2",
          700: "#345679",
          800: "#233951",
          900: "#111D28",
        },
        accent: {
          DEFAULT: "#A1E3F9",
          foreground: "#0F3B5F",
          50: "#F5FCFE",
          100: "#EBF9FD",
          200: "#D7F3FB",
          300: "#C3EDF9",
          400: "#A1E3F9", // Main accent color
          500: "#81D6F7",
          600: "#67ABC6",
          700: "#4D8094",
          800: "#345663",
          900: "#1A2B31",
        },
        mint: {
          DEFAULT: "#D1F8EF",
          foreground: "#0F5F4B",
          50: "#F9FEFD",
          100: "#F3FDFA",
          200: "#E7FBF5",
          300: "#DBF9F0",
          400: "#D1F8EF", // Main mint color
          600: "#A7C6BF",
          700: "#7D958F",
          800: "#53635F",
          900: "#293230",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 3s infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

