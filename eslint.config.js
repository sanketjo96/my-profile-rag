import globals from "globals";
import importPlugin from "eslint-plugin-import";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: globals.node,
    },
    plugins: { import: importPlugin },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".json"],
        },
      },
    },
    rules: {
      // Unresolved module paths (missing import / wrong path)
      "import/no-unresolved": "error",
      // Wrong named imports (e.g. `import { x } from './m.js'` when `x` doesn't exist)
      "import/named": "error",
      // Wrong default imports (e.g. importing default when only named exports exist)
      "import/default": "error",
      // Catch "forgot to import/define" cases (ReferenceError-style)
      "no-undef": "error",
    },
  },
];

