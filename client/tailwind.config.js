/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',       // for border-border
        ring: 'var(--color-ring)',           // for outline-ring
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      outline: {
        ring: ['2px solid var(--color-ring)'], // define outline-ring
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
