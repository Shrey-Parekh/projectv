import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ["var(--font-handwriting)", "cursive"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        blush: {
          50: "#fff5f7",
          100: "#ffe4ec",
          200: "#ffbfd3",
          300: "#ff92b2",
          400: "#ff5c8a",
          500: "#ff3366",
          600: "#e01757",
          700: "#b01046",
          800: "#800a34",
          900: "#4f0520"
        },
        lilac: {
          50: "#f8f5ff",
          100: "#ede7ff",
          200: "#d5c7ff",
          300: "#b29aff",
          400: "#8b63ff",
          500: "#6b3bff",
          600: "#5528e0",
          700: "#4320b0",
          800: "#2f167d",
          900: "#1c0d4c"
        },
        cream: {
          50: "#fffaf3",
          100: "#fff3e1",
          200: "#ffe0b8",
          300: "#ffcc8a",
          400: "#ffb159",
          500: "#ff9830",
          600: "#e07320",
          700: "#b05418",
          800: "#803912",
          900: "#4f220a"
        }
      },
      boxShadow: {
        "polaroid": "0 18px 35px rgba(0,0,0,0.2)",
        "soft": "0 10px 25px rgba(0,0,0,0.18)"
      },
      backgroundImage: {
        "paper": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" }
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "100%": { transform: "translate3d(60px, -120px, 0) rotate(12deg)" }
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.08)" },
          "40%": { transform: "scale(0.98)" },
          "60%": { transform: "scale(1.04)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
        heartbeat: "heartbeat 1.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

