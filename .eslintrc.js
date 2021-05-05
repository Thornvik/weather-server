module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'lines-between-class-members': 'off',
    'max-len': ['error', { code: 150 }],
    'no-console': 'off',
    'no-use-before-define': 'off',
    'no-tabs': 'off',
    'no-multi-spaces': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'prefer-template': 'off',
    'no-unused-vars': 'off',
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
  },
}
