exports.onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
  const config = getConfig()
  // Fix hot-loader warning on Windows
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    }
  }

  // Don't include source maps
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false,
    })
  }
}
