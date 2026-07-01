import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)"
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem"
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      fontSize: {
        hero: ["clamp(2.85rem, 7vw, 6.2rem)", { lineHeight: "0.94", letterSpacing: "-0.065em" }],
        display: ["clamp(2.45rem, 5vw, 5rem)", { lineHeight: "0.98", letterSpacing: "-0.06em" }],
        title: ["clamp(1.9rem, 3vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.04em" }]
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
        inset: "var(--shadow-inset)"
      },
      backdropBlur: {
        glass: "18px"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite"
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".glass-panel": {
          background: "var(--glass-background)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-card)",
          backdropFilter: "blur(18px) saturate(160%)"
        },
        ".text-balance": {
          textWrap: "balance"
        }
      });
    })
  ]
};

export default config;
