import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default typescriptEslint.config(
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "quotes": [
        "error",
        "double",
        { "avoidEscape": true, "allowTemplateLiterals": true }
      ],
      "jsx-quotes": ["error", "prefer-double"],
    },
  }
);

