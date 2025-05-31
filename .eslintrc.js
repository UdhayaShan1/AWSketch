// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier' // turn off conflicting rules with Prettier
  ],
  plugins: ['react', '@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Customize your rules here
    'react/react-in-jsx-scope': 'off', // for React 17+
    'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }],
  },
};
