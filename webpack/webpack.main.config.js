const path = require("path");
const folders = ["base", "client", "shared", "utils"];

function createAliases() {
  const aliases = {};

  for (const folder of folders) {
    aliases[folder] = path.resolve(process.cwd(), `src/${folder}/`);
  }

  return aliases;
}

module.exports = {
  entry: "./src/base/index.ts",
  module: {
    rules: require("./webpack.rules"),
  },
  resolve: {
    alias: createAliases(),
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
