const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(process.cwd(), "./public"),
        to: path.resolve(process.cwd(), ".webpack", "public"),
      },
      {
        from: path.resolve(process.cwd(), "./.env"),
        to: path.resolve(process.cwd(), ".webpack", "main"),
      },
    ],
  }),
];
