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
    lodash: "../node_modules/lodash/lodash",
    jquery: "../node_modules/jquery/dist/jquery",
    underscore: "../node_modules/underscore/underscore"
  },

  shim: {
    "plugins/backbone.layoutmanager": ["backbone"],
    "plugins/backbone.localstorage": ["backbone"]
  }

});
