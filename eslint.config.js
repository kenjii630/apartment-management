import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react"; // 👈 Add this

export default [
  { ignores: ["dist", "**/*.d.ts"] }, // 👈 Ignore TypeScript declaration files
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest", // 👈 Single source of truth
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node, // 👈 If using SSR/Node APIs
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          impliedStrict: true, // 👈 Enable strict mode
        },
      },
    },
    plugins: {
      react, // 👈 Add core React plugin
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules, // 👈 Add React recommended rules
      ...reactHooks.configs.recommended.rules,
      "react/jsx-uses-react": "error", // 👈 Needed for JSX detection
      "react/jsx-uses-vars": "error",
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off", // 👈 Not needed with automatic JSX runtime
    },
    settings: {
      react: {
        version: "detect",
        pragma: "React", // 👈 Explicit JSX pragma
        linkComponents: [
          { name: "Link", linkAttribute: "to" }, // 👈 For React Router
        ],
      },
    },
  },
  // Add to config array
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error", // TS version
    },
  },
];
