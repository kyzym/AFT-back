module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "error",
    "no-console": "off",
    quotes: ["error", "double", { avoidEscape: true }],
    "prettier/prettier": "error",
  },
};
