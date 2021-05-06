module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      }
    }
  },
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
    'no-nested-ternary': 'off',
    semi: ['error', 'never'],

    'import/prefer-default-export': 'off',

    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-tabs': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
}
