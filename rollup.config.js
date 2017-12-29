export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  external: [ 'promise-polyfill' ] // <-- suppresses the warning
};