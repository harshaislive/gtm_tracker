/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        // Beforest Brand Colors
        beforest: {
          // Primary Colors
          'dark-earth': '#342e29',
          'rich-red': '#86312b',
          'forest-green': '#344736',
          'deep-blue': '#002140',
          // Secondary Colors
          'dark-brown': '#4b3c35',
          'burnt-red': '#9e3430',
          'olive-green': '#415c43',
          'dark-blue-alt': '#00385e',
          'warm-yellow': '#ffc083',
          'coral-orange': '#ff774a',
          'soft-green': '#b8dc99',
          'light-blue': '#b0ddf1',
          // Neutrals
          'charcoal-gray': '#51514d',
          'soft-gray': '#e7e4df',
          'off-white': '#fdfbf7',
        },
        // Legacy glass colors for compatibility
        glass: {
          'bg': 'rgba(52, 46, 41, 0.15)',
          'border': 'rgba(253, 251, 247, 0.2)',
          'accent': 'rgba(255, 192, 131, 0.8)',
        }
      },
      backdropBlur: {
        'glass': '25px',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slideInRight': 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slideInLeft': 'slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fadeIn': 'fadeIn 0.4s ease-out forwards',
        'scaleIn': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ripple': 'ripple 1.5s ease-out infinite',
        'wave': 'wave 1s ease-in-out infinite',
        'scrollbar-hide': 'scrollbar-hide 1.5s ease-out forwards',
      },
      keyframes: {
        slideInRight: {
          '0%': { 
            transform: 'translateX(100%) scale(0.8)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateX(0) scale(1)', 
            opacity: '1' 
          }
        },
        slideInLeft: {
          '0%': { 
            transform: 'translateX(-100%) scale(0.8)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateX(0) scale(1)', 
            opacity: '1' 
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { 
            transform: 'scale(0.9)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          }
        },
        ripple: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(2.5)',
            opacity: '0'
          }
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' }
        },
        'scrollbar-hide': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      }
    },
  },
  plugins: [],
} 