import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_", // Ignore variables starting with '_'
          argsIgnorePattern: "^_", // Ignore arguments starting with '_'
          caughtErrorsIgnorePattern: "^_", // Ignore catch clause variables starting with '_'
        },
      ],
    },
  },
];
