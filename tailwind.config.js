/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#155EEF", // Primary blue
          hover: "#1048bc",
          light: "#EFF5FF",  // Light blue
        },
        navy: {
          DEFAULT: "#111B35", // Deep navy
          dark: "#0b1224",
          light: "#1c294d",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          tint: "#F7F9FC",   // Page tint
        },
        content: {
          main: "#17213B",   // Main text
          muted: "#64748B",  // Muted text
        },
        border: {
          DEFAULT: "#E5EAF2", // Borders
          subtle: "#F1F4F9",
        },
        // Keep compatibility aliases
        "background-light": "#F7F9FC",
        "background-dark": "#111B35",
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        'btn': '0.75rem',    // 10-12px
        'card': '1rem',      // 14-16px
        'card-lg': '1.125rem', // 18px
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(17, 27, 53, 0.04), 0 1px 2px -1px rgba(17, 27, 53, 0.04)',
        'card': '0 4px 20px -2px rgba(17, 27, 53, 0.05)',
        'premium': '0 12px 32px -4px rgba(17, 27, 53, 0.08)',
        'elevated': '0 20px 40px -8px rgba(21, 94, 239, 0.15)',
      }
    },
  },
  plugins: [],
}
