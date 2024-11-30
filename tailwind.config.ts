import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: "#BD8306"
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            },
            keyframes: {
                "fade-in-down": {
                    "0%": {
                        opacity: "0.6",
                        transform: "translate(0,-10px)"
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translate(0,0)"
                    }
                },
                "zoom-in": {
                    "0%": {
                        transform: "scale(0)"
                    },
                    "100%": {
                        transform: "scale(1)"
                    }
                }
            },
            animation: {
                "fade-in-down": "fade-in-down 0.3s",
                "zoom-in": "zoom-in 0.3s"
            }
        }
    }
};
export default config;
