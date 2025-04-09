import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Add the custom rule to disable no-unused-vars
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",  // Disable the rule here
    },
  },
];

export default eslintConfig;
