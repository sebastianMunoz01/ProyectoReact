module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'src/test/setupTests.js',
      'src/test/**/*.spec.jsx'
    ],

    preprocessors: {
      'src/test/setupTests.js': ['webpack'],
      'src/test/**/*.spec.jsx': ['webpack']
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',

      resolve: {
        extensions: ['.js', '.jsx']
      },

      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            type: 'javascript/auto',

            resolve: {
              fullySpecified: false
            },

            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', {
                    runtime: 'automatic'
                  }]
                ],

                plugins: [
                  ['babel-plugin-istanbul', {
                    include: ['src/components/**/*.jsx'],
                    exclude: ['src/test/**']
                  }]
                ]
              }
            }
          }
        ]
      }
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};