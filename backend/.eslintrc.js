module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: { node: true },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: { sourceType: 'script' },
    },
  ],
  parserOptions: { ecmaVersion: 'latest' },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'object-curly-newline': ['error', { multiline: true }],
    'linebreak-style': 'off',
    'arrow-body-style': 'off',
  },
};
