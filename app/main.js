require([
    // Wait till dom is loaded
    "plugins/domready!",

    // Application.
    "app",

    // Main Router.
    "router",

    "views/app"
],

function(doc, app, Router, AppView) {

    AppView.render();

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    Backbone.history.start();
});
