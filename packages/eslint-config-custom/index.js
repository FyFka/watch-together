module.exports = {
  extends: ["turbo", "eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "error",
    "no-debugger": "error",
  },
  env: {
    node: true,
    browser: true,
  },
};
