/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'oohpoint-primary-1': '#1b0a37',
  			'oohpoint-primary-2': '#6F4BA6',
  			'oohpoint-primary-3': '#341266',
  			'oohpoint-secondary-1': '000000',
  			'oohpoint-secondary-2': '000000',
  			'oohpoint-secondary-3': '000000',
  			'oohpoint-tertiary-1': '#9139A5',
  			'oohpoint-tertiary-2': '#B77DC4',
  			'oohpoint-tertiary-3': '#752E85',
  			'oohpoint-grey-100': '#FFFFFF',
  			'oohpoint-grey-200': '#F2F0F5',
  			'oohpoint-grey-300': '#B2A6C4',
  			'oohpoint-grey-400': '#4F3A6F',
  			'oohpoint-grey-500': '#250F45',
  			'oohpoint-grey-600': '#06010D',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			  purtle: {

				// 100:'#4F3A6F',
				// 200:'#4F3A6F',
				// 300:'#4F3A6F',
				400:'#4F3A6F',
				500:'#4F3A6F',
				200:'#4F3A6F',
				700:'#4F3A6F',
				// 800:'#4F3A6F',
	  
			  },
			
			  grey: {
				800: '#6A6A6A',
				400: '#888888',
				 
			  },
			  purcel: {
				800: '#341266',
				
			  },
			  grayis: {
				400: '#878C91',
				
			  },
			  blue: {
				600: '#341266',
				
			  },
			  beige: {
				400: '#FFF6ED',
				
			  },
			  green: {
				100: '#34B9662B'
				
			  },
			  grays: {
				100: '#F2F0F5'
				
			  },
			  icon: {
				100: '#341266',
			  },
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: ["Poppins", "sans-serif"]
  		},
		  backgroundImage: {
			"design-bg": "url('/bgdesign.webp')",
			"oohpoint-primary": `linear-gradient(0deg, #441886, #441886),
			linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
			linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
			linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
			linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))`,
		  },
			  borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
