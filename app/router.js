define([
  // Application.
  "app",
  "views/display-list"
],

function(app, DisplayListView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "display/:mode": "setDisplayMode"
    },

    setDisplayMode: function(mode) {
        DisplayListView.setMode(mode);
    }
  });

  return Router;

});
