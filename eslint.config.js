import globals from "globals";
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintParser from '@typescript-eslint/parser'

export default [
  {ignores: ['dist/', 'public/', '.astro/'],},
  {
    files: ["src/**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser, parser: eslintParser},
  },
  ...eslintPluginAstro.configs.recommended,
];