import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        primary: "#181a1f",
      },
    },
  },
  plugins: [],
};

export default config;
