module.exports = {
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: 'packages/@AOTP11/angular/**',
      options: {
        semi: true,
      },
    },
  ],
}
