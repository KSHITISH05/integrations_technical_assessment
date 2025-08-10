/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          chart: {
            "1": "hsl(var(--chart-1))",
            "2": "hsl(var(--chart-2))",
            "3": "hsl(var(--chart-3))",
            "4": "hsl(var(--chart-4))",
            "5": "hsl(var(--chart-5))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        animation: {
          "fade-in": "fade-in 0.5s ease-out",
          "slide-in": "slide-in 0.5s ease-out",
          "pulse-success": "pulse-success 2s infinite",
          "glow": "glow 2s ease-in-out infinite alternate",
        },
        keyframes: {
          "fade-in": {
            "0%": { opacity: "0", transform: "translateY(10px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          "slide-in": {
            "0%": { opacity: "0", transform: "translateX(-20px)" },
            "100%": { opacity: "1", transform: "translateX(0)" },
          },
          "pulse-success": {
            "0%, 100%": { 
              transform: "scale(1)",
              boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)"
            },
            "50%": { 
              transform: "scale(1.05)",
              boxShadow: "0 0 0 10px rgba(34, 197, 94, 0)"
            },
          },
          "glow": {
            "0%": { boxShadow: "0 0 5px rgba(236, 72, 153, 0.5)" },
            "100%": { boxShadow: "0 0 20px rgba(236, 72, 153, 0.8)" },
          },
        },
        backgroundImage: {
          "gradient-primary": "linear-gradient(135deg, hsl(346.8 77.2% 49.8%), hsl(262.1 83.3% 57.8%))",
          "gradient-card": "linear-gradient(135deg, hsl(240 10% 3.9%), hsl(240 10% 6.9%))",
          "gradient-success": "linear-gradient(135deg, hsl(142.1 76.2% 36.3%), hsl(142.1 76.2% 46.3%))",
        },
        boxShadow: {
          "card": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          "success": "0 0 20px rgba(34, 197, 94, 0.3)",
          "glow": "0 0 20px rgba(236, 72, 153, 0.5)",
        },
      },
    },
    plugins: [],
  }