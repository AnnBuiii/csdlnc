/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a56db',
        secondary: '#0e9f6e',
        accent: '#7e3af2',
        danger: '#e02424',
        dark: '#1f2937',
        light: '#f9fafb',
        muted: '#6b7280',
      }
    },
  },
  plugins: [],
}
