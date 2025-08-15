const path = require('node:path');

module.exports = {
  mode: 'production',
  entry: { entry1: ['./index.js', './bar.js'], entry2: ['./indexAlt.js', './bar.js'] },
  optimization: {
    // Turn off minification to make output easier to read
    minimizer: [],
  },
  output: {
    path: path.resolve('./build'),
  }
};
