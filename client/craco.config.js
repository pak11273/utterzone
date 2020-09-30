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
}
