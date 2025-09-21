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
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // TypeScript strict rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-var-requires": "error",

      // General strict rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-vars": "off", // Turn off base rule as we use the TypeScript version
      "prefer-const": "error",
      "no-var": "error",

      // React specific rules
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react/no-unescaped-entities": "warn",

      // Import rules
      "sort-imports": ["error", {
        "ignoreCase": true,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false
      }],
    },
  },
];

export default eslintConfig;
