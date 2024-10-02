/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@barbers-blade/eslint-config', '@barbers-blade/eslint-config/react-internal.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
  },
}
