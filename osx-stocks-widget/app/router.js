define([
  // Application.
  "app",
  "views/app"
],

function(app, AppView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
        AppView.render();
    }
  });

  return Router;

});
