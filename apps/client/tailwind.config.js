/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Senior AI / Atlas Design System
        'sa-bg': '#22262B',
        'sa-header': '#37383B',
        'sa-border': '#2D3034',
        'sa-surface-subtle': '#1A1D22',
        'sa-surface-soft': '#1F2227',
        'sa-surface-soft-alt': '#25282C',
        'sa-audio': '#393B45',
        'sa-video': '#373D39',
        'sa-mind': '#3D343C',
        'sa-reports': '#3D3D31',
        'sa-text-primary': '#E6E6E6',
        'sa-text-secondary': '#B6B7B7',
        'sa-text-muted': '#66686B',
        'sa-text-label': '#949697',
      },
      fontFamily: {
        'sa-sans': [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          'Inter',
          'sans-serif',
        ],
      },
      fontSize: {
        'sa-title': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        'sa-section': ['13px', { lineHeight: '18px', letterSpacing: '0.16em' }],
        'sa-card-title': ['13px', { lineHeight: '18px', letterSpacing: '0' }],
        'sa-body': ['13px', { lineHeight: '20px' }],
        'sa-small': ['11px', { lineHeight: '16px' }],
      },
      spacing: {
        'sa-20': '20px',
        'sa-21': '21px',
        'sa-26': '26px',
        'sa-27': '27px',
        'sa-11': '11px',
        'sa-15': '15px',
        'sa-61': '61px',
        'sa-90': '90px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
