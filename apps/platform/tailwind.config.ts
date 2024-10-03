import type { Config } from "tailwindcss";

import baseConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./**/*.tsx"],
  presets: [baseConfig],
};

export default config;
