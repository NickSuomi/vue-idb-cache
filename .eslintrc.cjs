module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}
