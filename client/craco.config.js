const CracoLessPlugin = require("craco-less")
const jestConfig = require("./jest.config")

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "@menu-collapsed-width": "60px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: {
      devServer: {
        historyApiFallback: true,
        contentBase: '/',
        hot: true
      }
    }
  },
  jest: {
    configure: {
      /* Any Jest configuration options: https://jestjs.io/docs/en/configuration. */
      testTimeout: 90000,
    },
  },
}
