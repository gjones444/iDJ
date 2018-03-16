var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  // This is the entry point or start of our react applicaton
  entry: "./client/app/app.js",

  // The plain compiled Javascript will be output into this file
  output: {
    path: __dirname,
    filename: "./client/public/bundle/bundle.js"
  },

  // This section desribes the transformations we will perform
  module: {
    rules: [
      {
        // Only working with files that in in a .js or .jsx extension
        test: /\.jsx?$/,
        // Webpack will only process files in our app folder. This avoids processing
        // node modules and server files unnecessarily
        include: /app/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          // These are the specific transformations we'll be using.
          presets: ["react", "es2015", 'stage-0']
        }
      },
      {
       test: /\.(png|jpg|svg)$/,
       use: {
         loader: "url-loader",
       },
     },
    ]
  },
  resolve: {
   extensions: ['.jsx', '.js']
 }
  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js

};
