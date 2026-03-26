module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parserOptions: { sourceType: "module", ecmaVersion: "latest" },
  plugins: ["import"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".json"],
      },
    },
  },
  rules: {
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/default": "error",
    "no-undef": "error",
  },
};

