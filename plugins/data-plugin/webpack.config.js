const path = require("path");

module.exports = {
  experiments: { outputModule: true },
  entry: "./index.ts", // Adjust the entry point to match your project's main file
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "esm/index.js", // Adjust the output file name as needed
    path: path.resolve(__dirname, "dist"),
    library: { type: "module" }, // Specify ESM output format
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: {
    minimize: false
  },
  // Add loaders and other configuration as needed for your project
};