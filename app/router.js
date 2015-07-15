define([
  "views/display-list"
],

function(DisplayListView) {

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
