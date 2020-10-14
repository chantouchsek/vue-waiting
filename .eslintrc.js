module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018
  },
  extends: ['prettier', 'prettier/vue'],
  // required to lint *.vue files
  plugins: [
    'prettier'
  ]
}
