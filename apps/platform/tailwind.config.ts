import type { Config } from "tailwindcss";

import baseConfig from "@repo/shadcn/tailwind.config";

const config: Pick<Config, "presets"> = {
  presets: [baseConfig],
};

export default config;
