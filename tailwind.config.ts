import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "facebook-icon": "#1877F2",
        "twitter-icon": "#1DA1F2",
        "discord-icon": "#7289DA",
      },
    },
  },
  plugins: [],
} satisfies Config;
