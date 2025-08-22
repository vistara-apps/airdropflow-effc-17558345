
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210 40% 98%)',
        accent: 'hsl(262 78% 60%)',
        primary: 'hsl(222 84% 50%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(222 47% 11%)',
        'text-secondary': 'hsl(222 47% 30%)',
      },
      spacing: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(0, 0%, 0%, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: {
        display: ['text-5xl', { fontWeight: '800' }],
        heading: ['text-2xl', { fontWeight: '700' }],
        body: ['text-base', { lineHeight: '1.75' }],
        caption: ['text-sm', { color: 'hsl(222 47% 30%)' }],
      },
    },
  },
  plugins: [],
}
