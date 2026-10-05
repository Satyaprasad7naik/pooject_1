import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enterprise Neutral Palette
        background: "#09090b", // zinc-950
        surface: "#18181b",    // zinc-900 (for cards)
        border: "#27272a",     // zinc-800 (for crisp, thin lines)
        muted: "#a1a1aa",      // zinc-400 (for secondary text)
        // Single Professional Accent
        primary: "#6366f1",    // indigo-500 (Use ONLY for active tabs and 'Send' buttons)
      },
    },
  },
  plugins: [],
};
export default config;

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
