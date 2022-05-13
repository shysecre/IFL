const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
const path = require('path')

const folders = ['base', 'client', 'shared', 'utils']

function createAliases() {
  const aliases = {}

  for (const folder of folders) {
    aliases[folder] = path.resolve(process.cwd(), `src/${folder}/`)
  }

  return aliases
}

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})

rules.push({
  test: /\.svg$/,
  use: [
    {
      loader: 'react-svg-loader',
      options: { tsx: true },
    },
  ],
})

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    alias: createAliases(),
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
}
