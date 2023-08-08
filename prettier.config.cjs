/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-organize-imports')],
  pluginSearchDirs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'auto',
}
