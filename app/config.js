// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../assets/vendor",

    // Libraries.
    backbone: "../node_modules/backbone/backbone",
    "backbone.localstorage": "../node_modules/backbone.localstorage/backbone.localStorage",
    lodash: "../node_modules/lodash/lodash",
    jquery: "../node_modules/jquery/dist/jquery",
    underscore: "../node_modules/underscore/underscore"
  }

});
