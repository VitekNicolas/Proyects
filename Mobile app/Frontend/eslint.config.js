// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");
const { rules } = require('eslint-config-prettier');

module.exports = {
  extends: ["expo","prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "react-native/no-inline-styles": "off", // Allow inline styles for simplicity
    "react-native/no-color-literals": "off", // Allow color literals for simplicity
  },
};